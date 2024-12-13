
// debugMode를 true로 설정하면 디버깅 메시지가 활성화됩니다.
const debugMode = true;

/**
 * 메인 실행 함수
 * 크롬 확장 프로그램에서 팝업 실행 시 작동
 */
(function () {
    let evaluationCriteria = {};
    let policyData = {};
    let evaluationResults = {};

    // 평가 기준 로드
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

    // 개인정보 처리방침 데이터 크롤링
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

    // 평가 로직
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

    // 평가 결과를 Excel로 저장
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

    // 평가 결과 표시
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

    // 저장 버튼 활성화/비활성화
    function toggleSaveButton(enable) {
        const saveButton = document.getElementById('save-excel');
        saveButton.disabled = !enable;
        debugMode && console.log(`[DEBUG] 저장 버튼 상태: ${enable ? "활성화" : "비활성화"}`);
    }

    // 저장 버튼 이벤트 리스너
    document.getElementById('save-excel').addEventListener('click', () => {
        if (!evaluationResults || !evaluationResults.missingSections) {
            alert("저장할 평가 결과가 없습니다. 평가를 확인하세요.");
            console.warn("[WARNING] 저장 시도 실패: 평가 결과가 없습니다.");
            return;
        }
        saveAsExcel(evaluationResults);
        alert("평가 결과가 Excel 파일로 저장되었습니다.");
    });

    // 페이지 로드 후 실행
    window.addEventListener('load', () => {
        console.log("[INFO] 데이터 크롤링 및 평가를 시작합니다.");
        policyData = extractPolicyData();
        evaluationResults = evaluatePolicy(policyData);
        displayResults(evaluationResults);
        toggleSaveButton(true);
    });
})();


평가 항목
1. 개인정보의 처리 목적

지표
① 개인정보 처리 목적을 구체적이고 명확하게 기재하고 있는가?
①-1. 정보주체가 개인정보 처리 목적을 인지할 수 있도록 모호한 표현 없이 명확하게 기재하고 있는가?
정성
근거법령
「개인정보 보호법」 제3조, 제30조 제1항
평가기준(착안사항)

◈ 정보주체가 해당 사무의 개인정보 처리 목적을 알기 쉽게 이해할 수 있도록 작성하였는지 여부를 평가하기 위함 


 개인정보를 처리하는 서비스 현황에 대한 개인정보 처리 목적이 개인정보 처리방침에 정보주체가 이해할 수 있도록 작성되어 있는지 확인함 

 정보주체가 처리방침 상의 목적만 확인하고도 개인정보 처리 목적을 충분히 예측할 수 있을 정도로 구체적으로 작성되어 있는지 확인 
 여러 개의 서비스를 제공하는 경우, 정보주체가 이해하기 쉽도록 처리 목적을 서비스 별로 구분하여 작성하였는지 확인


주요 감점사례



● 여러개의 서비스에 대한 처리 목적을 묶음으로 작성하여 어떤 서비스 목적으로 수집‧처리 되는지를 파악하기 어려운 경우


 개인정보를 처리하는 서비스 현황에 대한 개인정보 처리 목적을 축약하거나 광범위한 표현 없이 작성하였는지 여부를 확인함 

 개인정보 처리 목적을 ‘~등’과 같이 축약하거나, 포괄적으로 작성하지 않았는지 확인


주요 감점사례



● 처리 목적을 광범위하게 설정하여 포괄적으로 작성하였거나 축약하여 정보주체 관점에서 개인정보 처리 목적을 예측하기 어려운 경우


 동일 산업 분야의 유사한 타 개인정보처리자와 비교하여, 개인정보의 처리 목적이 구체적이고 적정한지 비교하여 확인함 

 본질적 서비스 목적 달성을 위한 개인정보 처리 목적을 적정하고, 구체적으로 작성하였는지 확인 


주요 감점사례



● 동일 산업 분야의 타 개인정보처리자에 비해 유사한 서비스에 대하여 작성된 처리 목적이 상대적으로 구체적이지 않은 경우


증빙자료
1. 개인정보 처리 현황을 확인할 수 있는 자료 (서비스 목록별 처리 현황표 등) 
배점기준
● 개인정보처리자가 제공하는 서비스 별로 처리방침의 개인정보 처리 목적을 구체적으로 작성하였는지 여부를 확인하여 평가 

평가 및 배점 기준

◾ 서비스별 개인정보 처리 목적을 구분하여 정보주체가 알아보기 쉽게 구체적이고 명확하게 기재한 경우 
□ 우수
◾ 작성된 처리 목적이 상세하지는 않지만, 정보주체가 개인정보 처리 목적의 대략적인 내용을 예측 가능하도록 핵심적인 내용을 작성한 경우
□ 보통
◾ 처리 목적을 포괄적으로 작성하여 정보주체 관점에서 개인정보 처리 목적을 예측하기 어려운 경우
◾ 개인정보 처리 목적을 ‘~등’과 같이 축약하거나 광범위하게 작성하여 모호하게 표현된 경우
□ 미흡

근거법령
(조문)
제3조(개인정보 보호 원칙) ① 개인정보처리자는 개인정보의 처리 목적을 명확하게 하여야 하고 그 목적에 필요한 범위에서 최소한의 개인정보만을 적법하고 정당하게 수집하여야 한다.
제30조(개인정보 처리방침의 수립 및 공개) ① 개인정보처리자는 다음 각 호의 사항이 포함된 개인정보의 처리 방침(이하 “개인정보 처리방침”이라 한다)을 정하여야 한다.
   1. 개인정보의 처리 목적
