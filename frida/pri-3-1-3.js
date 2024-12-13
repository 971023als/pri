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
3. 개인정보의 처리 및 보유기간

지표
① 개인정보의 처리 및 보유기간을 적정하게 정하여 구체적이고 명확하게 기재하고 있는가? 
①-3. 법령에 따라 개인정보를 파기하지 않고 보관하는 경우 보존 근거와 보존하는 항목, 보유기간을 모호한 표현 없이 명확하게 기재하고 있는가?
정성
근거법령
「개인정보 보호법」 제21조, 제30조 제1항
「표준 개인정보 보호지침」 제11조
평가기준(착안사항)

◈ 법령에 따라 개인정보를 파기하지 않고 보존하는 경우 해당 내용을 명확하고 구체적으로 작성했는지 여부를 평가하기 위함 


 법령에 따라 개인정보를 파기하지 않고 보존하는 경우 해당 법령 및 조문과 보존하는 개인정보 항목을 구체적으로 기재하였는지 여부를 확인함

 [사전검토자료 참고] 법령에 따라 일정기간 보관해야 하는 서비스 목록을 참고하며, 해당 서비스 별 보존하는 항목, 보유기간 및 법적근거를 구체적으로 기재하였는지 여부 확인 
 해당 내용은 처리방침의 ‘개인정보의 처리 및 보유기간’ 또는 ‘개인정보의 파기 절차 및 방법에 관한 사항’에 명확하게 작성되어있는지 확인 



주요 감점사례



● 개인정보를 파기하지 않고 보존하는 경우에 해당하나, 작성해야 하는 사항(해당 법령 및 조문, 보존하는 개인정보 항목)을 누락한 경우
● 포괄적으로 묶어서 작성하거나, 축약하는 형태로 작성한 경우


증빙자료
1. 개인정보 처리 현황을 확인할 수 있는 자료 (서비스 목록별 처리 현황표 등) 
배점기준
● 처리 및 보유기간에 대한 구체적인 내용을 명확하게 작성했는지 평가  

평가 및 배점 기준

◾ 개인정보를 파기하지 않고 보존하는 경우 기재사항(해당 법령 및 조문과 보존하는 개인정보 항목)을 구체적으로 기재한 경우 
□ 우수
◾ 개인정보를 파기하지 않고 보존하는 경우 기재사항(해당 법령 및 조문과 보존하는 개인정보 항목)을 모두 기재는 하고 있으나, 일부 내용이 구체적이지 않은 경우 (ex. 법령명만 기재한 경우)
□ 보통
◾ 개인정보를 파기하지 않고 보존하는 경우 기재사항(해당 법령 및 조문과 보존하는 개인정보 항목)이 일부 누락되었거나, 포괄적이고 축약하는 형태(‘~등’)로 기재하여 내용이 추상적이고 모호한 경우 
□ 미흡

근거법령
(조문)
제21조(개인정보의 파기) ① 개인정보처리자는 보유기간의 경과, 개인정보의 처리 목적 달성, 가명정보의 처리 기간 경과 등 그 개인정보가 불필요하게 되었을 때에는 지체 없이 그 개인정보를 파기하여야 한다. 다만, 다른 법령에 따라 보존하여야 하는 경우에는 그러하지 아니하다.
제30조(개인정보 처리방침의 수립 및 공개) ① 개인정보처리자는 다음 각 호의 사항이 포함된 개인정보의 처리 방침(이하 “개인정보 처리방침”이라 한다)을 정하여야 한다. 이 경우 공공기관은 제32조에 따라 등록대상이 되는 개인정보파일에 대하여 개인정보 처리방침을 정한다.
  1. 개인정보의 처리 목적
  2. 개인정보의 처리 및 보유 기간
  3. 개인정보의 제3자 제공에 관한 사항(해당되는 경우에만 정한다)
  3의2. 개인정보의 파기절차 및 파기방법(제21조제1항 단서에 따라 개인정보를 보존하여야 하는 경우에는 그 보존근거와 보존하는 개인정보 항목을 포함한다)
  3의3. 제23조제3항에 따른 민감정보의 공개 가능성 및 비공개를 선택하는 방법(해당되는 경우에만 정한다)
  4. 개인정보처리의 위탁에 관한 사항(해당되는 경우에만 정한다)
  4의2. 제28조의2 및 제28조의3에 따른 가명정보의 처리 등에 관한 사항(해당되는 경우에만 정한다)
  5. 정보주체와 법정대리인의 권리ㆍ의무 및 그 행사방법에 관한 사항
  6. 제31조에 따른 개인정보 보호책임자의 성명 또는 개인정보 보호업무 및 관련 고충사항을 처리하는 부서의 명칭과 전화번호 등 연락처
  7. 인터넷 접속정보파일 등 개인정보를 자동으로 수집하는 장치의 설치ㆍ운영 및 그 거부에 관한 사항(해당하는 경우에만 정한다)
  8. 그 밖에 개인정보의 처리에 관하여 대통령령으로 정한 사항
