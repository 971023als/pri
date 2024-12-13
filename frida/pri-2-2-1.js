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
2. 처리하는 개인정보의 항목

지표
② 처리하는 개인정보의 항목을 적정하게 정하고 있는가?
②-1. 개인정보 항목은 개인정보 처리 목적에 비추어 필요 최소한으로 적정하게 정하고 있는가? 
정량
근거법령
「개인정보 보호법」 제3조, 제15조
「개인정보 보호법」 시행령 제31조 제1항 제1호
평가기준(착안사항)

◈ 개인정보 처리 목적에 필요한 범위에서 최소한의 개인정보만을 적법하고 정당하게 수집하고 있는지 여부를 평가하기 위함 


 개인정보 처리방침에 작성한 항목이 개인정보 처리 목적에 비추어 필요 최소한으로 적정한지 여부를 검토함 

 개인정보 보호법 제15조 제1항 제2호 및 제3호에 따라 관련 법령 등에 규정된 개인정보 항목이 있는지 여부 및 필요 최소한의 개인정보 항목이 맞는지 여부 확인 
   ※ 동의를 받을 때 정보주체에게 고지한 개인정보 항목이 필요 최소한의 항목이 맞는지 여부 확인  
 정보주체의 동의 없이 수집한 개인정보 항목의 경우 처리 목적 달성을 위해 필요한 최소한의 개인정보 항목인지 여부 확인 
 동일 산업 분야의 유사한 타 개인정보처리자와 비교하여, 서비스별 개인정보 처리 목적에 비추어 최소한의 개인정보 항목으로 적정한지 검토 


주요 감점사례



● 서비스별 개인정보 처리 목적에 비추어 불필요한 개인정보 항목을 포함하고 있는 경우
  ⇨ 해당 개인정보 항목이 서비스 제공 목적에 필요 최소한의 항목으로 판단한 근거 및 의견제출 자료 요청 가능


증빙자료
1. 개인정보 처리 현황을 확인할 수 있는 자료 (서비스 목록별 처리 현황표 등) 
배점기준
● 수집하는 개인정보 항목이 필요 최소한인지 여부를 확인하여 평가 

평가 및 배점 기준

◾ 개인정보 처리 목적별 필요한 최소한의 개인정보의 항목을 정하여 안내하고 있는 경우 
□ 이행
◾ 개인정보 처리 목적에 비추어 불필요한 개인정보 항목을 포함하고 있는 경우
◾ 정보주체의 동의 없이 처리하는 개인정보의 항목이 그 목적에 비추어 적정하지 않은 경우
□ 미이행

근거법령
(조문)
제3조(개인정보 보호 원칙) ① 개인정보처리자는 개인정보의 처리 목적을 명확하게 하여야 하고 그 목적에 필요한 범위에서 최소한의 개인정보만을 적법하고 정당하게 수집하여야 한다.
 제15조(개인정보의 수집ㆍ이용) ① 개인정보처리자는 다음 각 호의 어느 하나에 해당하는 경우에는 개인정보를 수집할 수 있으며 그 수집 목적의 범위에서 이용할 수 있다.
  1. 정보주체의 동의를 받은 경우
  2. 법률에 특별한 규정이 있거나 법령상 의무를 준수하기 위하여 불가피한 경우
  3. 공공기관이 법령 등에서 정하는 소관 업무의 수행을 위하여 불가피한 경우
  4. 정보주체와 체결한 계약을 이행하거나 계약을 체결하는 과정에서 정보주체의 요청에 따른 조치를 이행하기 위하여 필요한 경우
  5. 명백히 정보주체 또는 제3자의 급박한 생명, 신체, 재산의 이익을 위하여 필요하다고 인정되는 경우
  6. 개인정보처리자의 정당한 이익을 달성하기 위하여 필요한 경우로서 명백하게 정보주체의 권리보다 우선하는 경우. 이 경우 개인정보처리자의 정당한 이익과 상당한 관련이 있고 합리적인 범위를 초과하지 아니하는 경우에 한한다.
  7. 공중위생 등 공공의 안전과 안녕을 위하여 긴급히 필요한 경우
  ② 개인정보처리자는 제1항제1호에 따른 동의를 받을 때에는 다음 각 호의 사항을 정보주체에게 알려야 한다. 다음 각 호의 어느 하나의 사항을 변경하는 경우에도 이를 알리고 동의를 받아야 한다.
  1. 개인정보의 수집ㆍ이용 목적
  2. 수집하려는 개인정보의 항목
  3. 개인정보의 보유 및 이용 기간
  4. 동의를 거부할 권리가 있다는 사실 및 동의 거부에 따른 불이익이 있는 경우에는 그 불이익의 내용
  ③ 개인정보처리자는 당초 수집 목적과 합리적으로 관련된 범위에서 정보주체에게 불이익이 발생하는지 여부, 암호화 등 안전성 확보에 필요한 조치를 하였는지 여부 등을 고려하여 대통령령으로 정하는 바에 따라 정보주체의 동의 없이 개인정보를 이용할 수 있다.
제31조(개인정보 처리방침의 내용 및 공개방법 등) ① 법 제30조제1항제8호에서 “대통령령으로 정한 사항”이란 다음 각 호의 사항을 말한다.
  1. 처리하는 개인정보의 항목
