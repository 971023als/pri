# 개인정보 처리방침 평가 스크립트

이 프로젝트는 개인정보 처리방침을 자동으로 크롤링하고, 필수 항목의 존재 여부 및 내용의 적합성을 평가하여 HTML, Word, Excel, CSV 또는 JSON 형식으로 보고서를 생성하는 스크립트입니다. 크롤링부터 평가, 보고서 생성까지 한 번에 처리할 수 있도록 설계되었습니다.

---

## 주요 기능
1. **개인정보 처리방침 크롤링**:


2. **개인정보 처리방침 자동 분석**:


3. **결과 보고서 생성**:

---

# 개인정보 처리방침 평가 크롬 확장 프로그램

이 프로젝트는 개인정보 처리방침을 크롤링하여 필수 섹션을 평가하고 결과를 Excel 파일로 저장하는 크롬 확장 프로그램입니다.

---

## 프로젝트 구성

```
project/
├── manifest.json        # 크롬 확장 프로그램의 설정 파일
├── popup.html           # 확장 프로그램의 팝업 HTML
├── popup.js             # 주요 자바스크립트 코드 (크롤링, 평가, 저장)
├── criteria.json        # 평가 기준 데이터
└── lib/
    └── xlsx.full.min.js # XLSX 라이브러리
```

---

## 실행 준비

### 1. 파일 생성
1. **manifest.json**
```json
{
    "manifest_version": 3,
    "name": "Privacy Policy Evaluator",
    "version": "1.0",
    "description": "Evaluate privacy policies and save results as Excel.",
    "permissions": ["activeTab", "scripting"],
    "host_permissions": ["<all_urls>"],
    "action": {
        "default_popup": "popup.html"
    },
    "content_scripts": [
        {
            "matches": ["<all_urls>"],
            "js": ["popup.js"]
        }
    ]
}
```

2. **popup.html**
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>개인정보 처리방침 평가</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
    <style>
        body { font-family: Arial, sans-serif; margin: 10px; }
        .missing { color: red; }
        .valid { color: green; }
        #results {
            max-height: 300px;
            overflow-y: auto;
            border: 1px solid #ccc;
            padding: 10px;
        }
        #save-excel:disabled {
            background-color: #ddd;
            color: #999;
            cursor: not-allowed;
        }
    </style>
</head>
<body>
    <h1>개인정보 처리방침 평가</h1>
    <div id="results" role="alert" aria-live="polite">
        <p>평가를 준비 중입니다...</p>
    </div>
    <button id="save-excel" disabled>Excel로 저장</button>
    <script src="popup.js"></script>
</body>
</html>
```

3. **popup.js**

```javascript
// debugMode를 true로 설정하면 디버깅 메시지가 활성화됩니다.
const debugMode = true;

(function () {
    let evaluationCriteria = {};
    let policyData = {};
    let evaluationResults = {};

    fetch('criteria.json')
        .then(response => {
            if (!response.ok) throw new Error(`criteria.json 파일을 로드할 수 없습니다: ${response.statusText}`);
            return response.json();
        })
        .then(data => {
            evaluationCriteria = data.en;
            debugMode && console.log("[DEBUG] 평가 기준이 성공적으로 로드되었습니다.", evaluationCriteria);
        })
        .catch(error => {
            console.error("[ERROR] 평가 기준 로드 중 오류 발생:", error);
            document.getElementById('results').innerHTML = `<p class="missing">❌ 평가 기준을 로드할 수 없습니다. 인터넷 연결 상태를 확인하세요.</p>`;
        });

    function extractPolicyData() {
        const title = document.querySelector('h1')?.textContent.trim() || '제목 없음';
        const sections = Array.from(document.querySelectorAll('h2, h3')).map(el => el.textContent.trim());

        if (sections.length === 0) {
            console.warn("[WARNING] 페이지에서 섹션을 찾을 수 없습니다. HTML 구조를 확인하세요.");
            return { title, sections: ["섹션을 찾을 수 없음"] };
        }

        debugMode && console.log("[DEBUG] 크롤링된 데이터:", { title, sections });
        return { title, sections };
    }

    function evaluatePolicy(data) {
        const missingSections = evaluationCriteria.requiredSections.filter(section =>
            !data.sections.includes(section)
        );

        debugMode && console.log("[DEBUG] 누락된 섹션:", missingSections);

        return {
            isValid: missingSections.length === 0,
            missingSections: missingSections,
        };
    }

    function saveAsExcel(results) {
        try {
            const workbook = XLSX.utils.book_new();
            const data = [
                ["섹션", "상태"],
                ...evaluationCriteria.requiredSections.map(section => [
                    section,
                    results.missingSections.includes(section) ? "누락" : "포함됨"
                ])
            ];

            const worksheet = XLSX.utils.aoa_to_sheet(data);
            XLSX.utils.book_append_sheet(workbook, worksheet, "평가 결과");
            XLSX.writeFile(workbook, 'evaluation-results.xlsx');
            console.log("[INFO] Excel 파일이 성공적으로 저장되었습니다.");
        } catch (error) {
            console.error("[ERROR] Excel 파일 저장 중 오류 발생:", error);
            alert("Excel 파일 저장에 실패했습니다. 다시 시도하세요.");
        }
    }

    function displayResults(results) {
        const resultsDiv = document.getElementById('results');
        if (results.isValid) {
            resultsDiv.innerHTML = `<p class="valid">✅ 모든 필수 섹션이 포함되었습니다.</p>`;
        } else {
            resultsDiv.innerHTML = `
                <p class="missing">❌ 누락된 섹션이 발견되었습니다. 아래 항목을 업데이트하세요:</p>
                <ul>
                    ${results.missingSections.map(section => `<li>${section}</li>`).join('')}
                </ul>`;
        }

        debugMode && console.log("[DEBUG] 결과 화면 표시 완료:", results);
    }

    function toggleSaveButton(enable) {
        const saveButton = document.getElementById('save-excel');
        saveButton.disabled = !enable;
        debugMode && console.log(`[DEBUG] 저장 버튼 상태: ${enable ? "활성화" : "비활성화"}`);
    }

    document.getElementById('save-excel').addEventListener('click', () => {
        if (!evaluationResults || !evaluationResults.missingSections) {
            alert("저장할 평가 결과가 없습니다. 평가를 확인하세요.");
            console.warn("[WARNING] 저장 시도 실패: 평가 결과가 없습니다.");
            return;
        }
        saveAsExcel(evaluationResults);
        alert("평가 결과가 Excel 파일로 저장되었습니다.");
    });

    window.addEventListener('load', () => {
        console.log("[INFO] 데이터 크롤링 및 평가를 시작합니다.");
        policyData = extractPolicyData();
        evaluationResults = evaluatePolicy(policyData);
        displayResults(evaluationResults);
        toggleSaveButton(true);
    });
})();
```

4. **criteria.json**
```json
{
    "en": {
        "requiredSections": ["Data Collection Items", "Purpose of Collection", "Retention Period", "Third-Party Provision"]
    }
}
```

---

## 실행 방법

### 1. 크롬 확장 프로그램 설정
1. 크롬에서 `chrome://extensions/`로 이동합니다.
2. "개발자 모드"를 활성화합니다.
3. "압축 해제된 확장 프로그램 로드" 버튼을 클릭합니다.
4. 위 프로젝트 폴더를 선택하여 로드합니다.

### 2. 확장 프로그램 실행
1. 브라우저에서 확장 프로그램 아이콘을 클릭합니다.
2. 팝업에서 평가 결과를 확인합니다.
3. "Excel로 저장" 버튼을 눌러 평가 결과를 저장합니다.

---
