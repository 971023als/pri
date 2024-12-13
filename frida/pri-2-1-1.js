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
① 개인정보 처리의 법적 근거와 처리하는 개인정보의 항목을 구체적이고 명확하게 기재하고 있는가?
①-1. 개인정보 처리의 법적 근거와 항목을 모호한 표현 없이 명확하게 기재하고 있는가?
정성
근거법령
「개인정보 보호법」 제15조 제2항, 제23조, 제24조
「개인정보 보호법」 시행령 제31조 제1항 제1호
평가기준(착안사항)

◈ 개인정보처리자가 처리하고 있는 각각의 개인정보 항목을 명확하게 기재하였는지 여부를 평가하기 위함


 개인정보처리자가 각각의 개인정보 처리의 법적근거와 항목을 정보주체가 명확히 알 수 있도록 기재하였는지 여부를 확인함 

 각각의 개인정보 처리의 법적근거와 항목을 구체적으로 작성하였는지 확인
 동의를 받아 수집하는 개인정보는 그 처리 목적에 따른 각각의 개인정보 항목을 구분하여 작성하였는지 확인
 법적근거를 작성할 때 그 법령명 및 해당 조문까지 구체적으로 작성하고, 동의 없이 처리하는 개인정보의 항목이 누락되지 않았는지 확인 

 개인정보 항목을 축약하거나 추상적이거나 모호한 표현을 사용하지 않고, 구체적으로 작성하였는지 여부를 확인함

 개인정보 항목을 ‘~등’과 같이 축약하거나, 추상적이거나 포괄적으로 작성하지 않았는지 확인 


주요 감점사례



● 개인정보 처리의 법적 근거 또는 항목 중 일부가 누락되었거나, 구체적이지 않아서 정보주체가 명확히 인지하기 어려운 경우
● 개인정보 항목을 ‘~등’으로 축약하거나 포괄적으로 작성한 경우


증빙자료
1. 개인정보 처리 현황을 확인할 수 있는 자료 (서비스 목록별 처리 현황표 등) 
배점기준
● 개인정보 처리의 법적근거와 항목을 명확하게 기재하였는지 여부를 평가 

평가 및 배점 기준

◾ 처리하는 개인정보 처리의 법적근거와 항목을 명확하게 모두 기재
◾ 동의를 받아 수집하는 개인정보는 그 처리 목적에 따른 개인정보 항목을 구분하여 기재한 경우
□ 우수
◾ 처리하는 개인정보 처리의 법적근거와 항목을 모두 기재하였으나, 처리 목적 따른 항목의 구분이 명확하지 않은 경우
   (ex. 처리목적에 따른 항목 구분이 포괄적인 경우 등)
□ 보통
◾ 처리하는 개인정보 처리의 법적근거와 항목 중 일부가 누락되었거나, 포괄적이고 축약하는 형태로 기재하여 내용이 추상적이고 모호한 경우 
□ 미흡

근거법령
(조문)
제15조(개인정보의 수집ㆍ이용) ② 개인정보처리자는 제1항제1호에 따른 동의를 받을 때에는 다음 각 호의 사항을 정보주체에게 알려야 한다. 다음 각 호의 어느 하나의 사항을 변경하는 경우에도 이를 알리고 동의를 받아야 한다.
제23조(민감정보의 처리 제한) ①개인정보처리자는 사상ㆍ신념, 노동조합ㆍ정당의 가입ㆍ탈퇴, 정치적 견해, 건강, 성생활 등에 관한 정보, 그 밖에 정보주체의 사생활을 현저히 침해할 우려가 있는 개인정보로서 대통령령으로 정하는 정보(이하 “민감정보”라 한다)를 처리하여서는 아니 된다. 다만, 다음 각 호의 어느 하나에 해당하는 경우에는  그러하지 아니하다.
  1. 정보주체에게 제15조제2항 각 호 또는 제17조제2항 각 호의 사항을 알리고 다른 개인정보의 처리에 대한 동의와 별도로 동의를 받은 경우
  2. 법령에서 민감정보의 처리를 요구하거나 허용하는 경우
  ② 개인정보처리자가 제1항 각 호에 따라 민감정보를 처리하는 경우에는 그 민감정보가 분실ㆍ도난ㆍ유출ㆍ위조ㆍ변조 또는 훼손되지 아니하도록 제29조에 따른 안전성 확보에 필요한 조치를 하여야 한다.
  ③ 개인정보처리자는 재화 또는 서비스를 제공하는 과정에서 공개되는 정보에 정보주체의 민감정보가 포함됨으로써 사생활 침해의 위험성이 있다고 판단하는 때에는 재화 또는 서비스의 제공 전에 민감정보의 공개 가능성 및 비공개를 선택하는 방법을 정보주체가 알아보기 쉽게 알려야 한다.
제24조(고유식별정보의 처리 제한) ① 개인정보처리자는 다음 각 호의 경우를 제외하고는 법령에 따라 개인을 고유하게 구별하기 위하여 부여된 식별정보로서 대통령령으로 정하는 정보(이하 “고유식별정보”라 한다)를 처리할 수 없다.
  1. 정보주체에게 제15조제2항 각 호 또는 제17조제2항 각 호의 사항을 알리고 다른 개인정보의 처리에 대한 동의와 별도로 동의를 받은 경우
  2. 법령에서 구체적으로 고유식별정보의 처리를 요구하거나 허용하는 경우
  ② 삭제
  ③ 개인정보처리자가 제1항 각 호에 따라 고유식별정보를 처리하는 경우에는 그 고유식별정보가 분실ㆍ도난ㆍ유출ㆍ위조ㆍ변조 또는 훼손되지 아니하도록 대통령령으로 정하는 바에 따라 암호화 등 안전성 확보에 필요한 조치를 하여야 한다.
  ④ 보호위원회는 처리하는 개인정보의 종류ㆍ규모, 종업원 수 및 매출액 규모 등을 고려하여 대통령령으로 정하는 기준에 해당하는 개인정보처리자가 제3항에 따라 안전성 확보에 필요한 조치를 하였는지에 관하여 대통령령으로 정하는 바에 따라 정기적으로 조사하여야 한다.
  ⑤ 보호위원회는 대통령령으로 정하는 전문기관으로 하여금 제4항에 따른 조사를 수행하게 할 수 있다.
제31조(개인정보 처리방침의 내용 및 공개방법 등) ① 법 제30조제1항제8호에서 “대통령령으로 정한 사항”이란 다음 각 호의 사항을 말한다.
  1. 처리하는 개인정보의 항목
