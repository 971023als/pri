import win32com.client as win32

def create_hwp_privacy_policy_section4():
    hwp = win32.gencache.EnsureDispatch("HWPFrame.HwpObject")
    hwp.RegisterModule("FilePathCheckDLL", "FilePathCheckerModule")

    # 새 문서 만들기
    hwp.HAction.Run("FileNew")

    # 제목 삽입
    hwp.HAction.GetDefault("InsertText", hwp.HParameterSet.HInsertText.HSet)
    hwp.HParameterSet.HInsertText.Text = "개인정보처리방침"
    hwp.HAction.Execute("InsertText", hwp.HParameterSet.HInsertText.HSet)

    # 페이지 나누기
    hwp.HAction.Run("BreakPage")

    # 제4조 제목 추가
    hwp.HAction.GetDefault("InsertText", hwp.HParameterSet.HInsertText.HSet)
    hwp.HParameterSet.HInsertText.Text = "제4조(개인정보의 제3자 제공에 관한 사항)"
    hwp.HAction.Execute("InsertText", hwp.HParameterSet.HInsertText.HSet)

    # 테이블 생성
    hwp.HAction.Run("TableCreate")
    hwp.HAction.GetDefault("TableCreate", hwp.HParameterSet.HTableCreation.HSet)
    hwp.HParameterSet.HTableCreation.Rows = 2  # 필요한 행 수에 따라 조정
    hwp.HParameterSet.HTableCreation.Cols = 5
    hwp.HParameterSet.HTableCreation.Create = True
    hwp.HAction.Execute("TableCreate", hwp.HParameterSet.HTableCreation.HSet)

    # 테이블 셀에 데이터 삽입
    cells_text = [
        ("개인정보 파일명", "제공받는자", "제공 목적", "제공하는 항목", "보유기간(관련 근거)"),
        ("창업 자금 대출 신청자 정보", "중소벤처기업부, 해당 지자체, 신용보증재단중앙회, 신용보증기금, 기술보증기금, 정부(중앙부처, 지자체)",
         "- 융자지원 신청 내용 확인 및 본인의 신용을 판단하기 위한 자료로 활용 - 공공기관에서 정책 자료로 활용 - 소상공인 연계 지원 업무, 성과 분석, 고객 만족도 조사, 기타 법령상 의무 이행 및 사후 관리",
         "성명, 주민등록번호, 집주소, 휴대전화번호",
         "1. 「개인정보보호법」제15조제1항 제1호, 제17조제1항제1호, 제23조제1항제1호, 제24조제1항제1호 2. 「신용정보의 이용 및 보호에 관한 법률」제32조제1항, 제2항, 제33조, 제34조 3. 「금융실명거래 및 비밀보장에 관한 법률」 제3조, 동법 시행령 제3조 4. 「소상공인 보호 및 지원에 관한 법률 시행령」 제13조 제2항 5. 정보주체의 동의")
    ]

    # 각 셀별 텍스트 삽입
    for row_idx, row_data in enumerate(cells_text):
        for col_idx, text in enumerate(row_data):
            hwp.MoveTo(row_idx + 3, col_idx + 1)  # 셀 위치에 맞게 조정
            hwp.PutFieldText(f"{{{{{row_idx + 1},{col_idx + 1}}}}}", text)

    # 문서 저장
    hwp.SaveAs("Privacy_Policy_Section4.hwp", "HWP", "")

    # 한글 종료
    hwp.Quit()

create_hwp_privacy_policy_section4()
