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
①-2. 개인정보처리자가 제공하는 서비스에 대한 개인정보 처리 목적을 개인정보 수집‧이용 시 고지하는 내용과 일치하도록 누락 없이 기재하고 있는가?
정량
근거법령
「개인정보 보호법」 제30조 제1항
평가기준(착안사항)

◈ 정보주체의 동의를 받아 개인정보의 수집‧이용하는 경우 동의를 받을 때 정보주체에게 고지하는 사항과 일치하는지 여부를 평가하기 위함 


 개인정보를 처리하는 서비스 별 수집‧이용 시 고지하는 처리 목적과 개인정보 처리방침의 처리 목적의 내용이 누락된 사항 없이 일치하는지 여부를 확인함

 [사전검토자료 참고] 서비스 단계별(회원가입, 상품구매, 고객상담 등) 수집‧이용 시 고지하는 사항과 처리방침에 작성된 내용의 일치 여부 확인  

 서비스별 개인정보 수집‧이용에 동의에 따른 고지 또는 별도 안내사항이 없는 경우, 서비스 목적 및 특성상 유사 서비스와의 비교 등을 통해 처리방침에 작성된 개인정보 처리 목적의 적정성을 검토 



주요 감점사례



● 개인정보를 처리하는 서비스 현황을 파악하여 검토한 결과, 고지된 개인정보 처리 목적과 일치하지 않거나 누락된 사항이 있는 경우
● 개인정보 수집‧이용 동의는 받고 있으나 처리 목적이 불명확하고, 처리방침에도 명확히 작성되어 있지 않은 경우
 ⇨ 평가대상에게 개인정보 처리 목적 확인을 위한 추가자료 요청 가능
  

증빙자료
1. 개인정보 처리 현황을 확인할 수 있는 자료 (서비스 목록별 처리 현황표 등) 
2. 개인정보 수집‧이용 동의서
배점기준
● 개인정보처리자가 제공하는 서비스 별로 처리방침의 개인정보 처리 목적을 누락하지 않고 작성하였는지 여부를 확인하여 평가 

평가 및 배점 기준

◾ 개인정보 수집‧이용 시 고지하는 내용과 모두 일치하며, 누락된 사항 없이 기재한 경우
□ 이행
◾ 서비스별 개인정보 처리 목적을 일부 누락하거나, 고지하는 내용과 불일치한 경우
□ 미이행

근거법령
(조문)
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
