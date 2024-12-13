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
①-2. 정보주체의 동의 없이 처리하는 개인정보의 항목과 법적 근거를 동의를 받아 처리하는 개인정보의 항목과 구분하여 기재하고 있는가? 
정량
근거법령
「개인정보 보호법」 제22조
「개인정보 보호법」 시행령 제31조 제1항 제1호
평가기준(착안사항)

◈ 정보주체의 동의 없이 처리할 수 있는 개인정보에 대해서 그 항목과 처리의 법적 근거를 정보주체의 동의를 받아 처리하는 개인정보와 구분하여 작성하였는지 여부를 평가하기 위함 


 정보주체의 동의 없이 처리하는 개인정보의 항목과 처리의 법적근거를 동의를 받아 처리하는 개인정보 항목과 구분하여 작성하였는지 여부를 확인함 

 동의 없이 처리하는 개인정보의 항목을 동의를 받아서 처리하는 개인정보 항목과 구분하여 작성하였는지 확인 
 동의 여부와 관계없이 여전히 필수항목과 선택항목으로 구분하여 작성하고 있는지 여부를 확인 


주요 감점사례



● 정보주체의 동의 없이 처리하는 개인정보 항목과 법적 근거를 동의를 받아 처리하는 항목과 구분하지 않았거나, 필수항목/선택항목으로 구분하여 작성한 경우


증빙자료
1. 개인정보 처리 현황을 확인할 수 있는 자료 (서비스 목록별 처리 현황표 등) 
배점기준
● 개인정보 처리의 법적근거와 항목을 명확하게 기재하였는지 여부를 평가 

평가 및 배점 기준

◾ 정보주체의 동의 없이 처리하는 개인정보 항목과 법적 근거를 동의를 받아 처리하는 개인정보 항목과 명확히 구분하여 기재된 경우 
□ 이행
◾ 정보주체의 동의 없이 처리하는 개인정보 항목과 법적 근거를 동의를 받아 처리하는 개인정보 항목과 구분하지 않고 기재한 경우 
□ 미이행

근거법령
(조문)
제22조(동의를 받는 방법) ① 개인정보처리자는 이 법에 따른 개인정보의 처리에 대하여 정보주체(제22조의2제1항에 따른 법정대리인을 포함한다. 이하 이 조에서 같다)의 동의를 받을 때에는 각각의 동의 사항을 구분하여 정보주체가 이를 명확하게 인지할 수 있도록 알리고 동의를 받아야 한다. 이 경우 다음 각 호의 경우에는 동의 사항을 구분하여 각각 동의를 받아야 한다.
  1. 제15조제1항제1호에 따라 동의를 받는 경우
  2. 제17조제1항제1호에 따라 동의를 받는 경우
  3. 제18조제2항제1호에 따라 동의를 받는 경우
  4. 제19조제1호에 따라 동의를 받는 경우
  5. 제23조제1항제1호에 따라 동의를 받는 경우
  6. 제24조제1항제1호에 따라 동의를 받는 경우
  7. 재화나 서비스를 홍보하거나 판매를 권유하기 위하여 개인정보의 처리에 대한 동의를 받으려는 경우
  8. 그 밖에 정보주체를 보호하기 위하여 동의 사항을 구분하여 동의를 받아야 할 필요가 있는 경우로서 대통령령으로 정하는 경우
  ② 개인정보처리자는 제1항의 동의를 서면(「전자문서 및 전자거래 기본법」 제2조제1호에 따른 전자문서를 포함한다)으로 받을 때에는 개인정보의 수집ㆍ이용 목적, 수집ㆍ이용하려는 개인정보의 항목 등 대통령령으로 정하는 중요한 내용을 보호위원회가 고시로 정하는 방법에 따라 명확히 표시하여 알아보기 쉽게 하여야 한다.
  ③ 개인정보처리자는 정보주체의 동의 없이 처리할 수 있는 개인정보에 대해서는 그 항목과 처리의 법적 근거를 정보주체의 동의를 받아 처리하는 개인정보와 구분하여 제30조제2항에 따라 공개하거나 전자우편 등 대통령령으로 정하는 방법에 따라 정보주체에게 알려야 한다. 이 경우 동의 없이 처리할 수 있는 개인정보라는 입증책임은 개인정보처리자가 부담한다.
  ④ 삭제
  ⑤ 개인정보처리자는 정보주체가 선택적으로 동의할 수 있는 사항을 동의하지 아니하거나 제1항제3호 및 제7호에 따른 동의를 하지 아니한다는 이유로 정보주체에게 재화 또는 서비스의 제공을 거부하여서는 아니 된다.
  ⑥ 삭제
  ⑦ 제1항부터 제5항까지에서 규정한 사항 외에 정보주체의 동의를 받는 세부적인 방법에 관하여 필요한 사항은 개인정보의 수집매체 등을 고려하여 대통령령으로 정한다.
제31조(개인정보 처리방침의 내용 및 공개방법 등) ① 법 제30조제1항제8호에서 “대통령령으로 정한 사항”이란 다음 각 호의 사항을 말한다.
  1. 처리하는 개인정보의 항목
