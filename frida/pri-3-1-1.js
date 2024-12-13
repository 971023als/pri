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
①-1. 개인정보 처리 및 보유기간을 처리 목적에 비추어 적정하게 정하고 있는가?
정량
근거법령
「개인정보 보호법」 제21조, 제30조 제1항
평가기준(착안사항)

◈ 개인정보 처리방침에 공개한 개인정보 처리 및 보유기간이 처리 목적에 비추어 적정한지 여부를 평가하기 위함


 동의를 받아 개인정보를 수집‧이용하는 경우, 개인정보 처리 및 보유기간을 최소한으로 정하고 있는지 여부를 확인함 

 동의를 받을 때 고지한 개인정보 처리 및 보유기간이 서비스 제공 목적에 비추어 과도하지 않은지 여부 확인  
 동일 산업 분야의 유사한 타 개인정보처리자와 비교하여, 동일한 처리 목적에 따른 개인정보 처리 및 이용기간이 적정한지 검토

 동의 없이 처리하는 개인정보에 대하여, 그 처리 목적 및 법적 근거에 따라 개인정보 처리 및 보유기간을 최소한으로 정하고 있는지 확인함

 개인정보 보호법 제15조 제1항 제2호 및 제3호에 해당하여 수집‧이용하는 경우, 관련 법령에 별도로 정한 기간이 있다면 그에 따라 적정하게 정하고 있는지 여부 확인 
 관련 법령에 별도로 정한 기간이 없거나, 개인정보 보호법 제15조 제1항 제4호 내지 제7호에 해당하여 수집‧이용하는 경우 동일 산업 분야의 다른 개인정보처리자와 비교하여 처리 목적에 따른 처리 및 보유기간이 적정한지 비교‧분석하여 검토 


주요 감점사례



● 개인정보 처리 목적에 따른 처리 및 보유기간이 서비스 제공 목적에 비추어 필요 이상으로 길거나, 작성된 내용이 모호하여 정보주체가 파기 시점을 예측하기 어려운 경우
● 동일 분야의 타 개인정보처리자와 비교하여, 동일한 서비스 목적에 대한 처리 및 보유기간이 상대적으로 과도하다고 판단되는 경우 

 
증빙자료
1. 개인정보 처리 현황을 확인할 수 있는 자료 (서비스 목록별 처리 현황표 등) 
2. 보유기간을 정하기 위해 검토한 사항 및 판단 기준 내부 보고자료 
배점기준
● 개인정보 처리 및 보유기간을 적정하게 정하고 있는지 여부를 평가

평가 및 배점 기준

◾ 개인정보 처리 목적별 보유기간을 필요 최소한으로 적정하게 정하고 있는 경우
□ 이행
◾ 개인정보 처리 목적별 보유기간 중 일부 또는 전체가 서비스제공 목적에 비추어 필요 이상으로 길거나 보유기간이 모호하여 파기시점을 알기 어려운 경우
□ 미이행

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
