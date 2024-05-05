import win32com.client as win32

def create_hwp_privacy_policy_section6():
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

    # 제6조 제목 추가
    hwp.HAction.GetDefault("InsertText", hwp.HParameterSet.HInsertText.HSet)
    hwp.HParameterSet.HInsertText.Text = "제6조(개인정보처리의 위탁에 관한 사항)"
    hwp.HAction.Execute("InsertText", hwp.HParameterSet.HInsertText.HSet)

    # 내용 추가
    paragraphs = [
        "① 밥누리 진흥공단은 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다.",
        "② 밥누리 진흥공단은 위탁계약 체결 시 「개인정보 보호법」 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적・관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리・감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.",
        "③ 「개인정보 보호법」 제26조 제6항에 따라 수탁자가 당사의 개인정보 처리업무를 재 위탁하는 경우 동의를 받고 있습니다.",
        "④ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체 없이 본 개인정보처리방침을 통하여 공개하도록 하겠습니다."
    ]
    
    for paragraph in paragraphs:
        hwp.HAction.GetDefault("InsertText", hwp.HParameterSet.HInsertText.HSet)
        hwp.HParameterSet.HInsertText.Text = paragraph
        hwp.HAction.Execute("InsertText", hwp.HParameterSet.HInsertText.HSet)
        hwp.HAction.Run("BreakPara")  # 문단 나누기

    # 테이블 생성 및 데이터 삽입
    hwp.HAction.Run("TableCreate")
    hwp.HAction.GetDefault("TableCreate", hwp.HParameterSet.HTableCreation.HSet)
    hwp.HParameterSet.HTableCreation.Rows = 3
    hwp.HParameterSet.HTableCreation.Cols = 4
    hwp.HParameterSet.HTableCreation.Create = True
    hwp.HAction.Execute("TableCreate", hwp.HParameterSet.HTableCreation.HSet)

    cells_text = [
        ("개인정보 파일명", "수탁 업체", "수탁 업무 내용", "보유 및 이용기간"),
        ("창업 자금 대출 신청자 정보", "해당 취급 은행", "융자지원의 설정, 유지, 이행, 관리 등", "2023.7.17 ~ 2025.7.17"),
        ("회원가입 정보", "Amazon Web Services, Inc", "Amazon 클라우드 컴퓨팅 환경에 개인정보 보관", "회원 탈퇴 또는 위탁 계약 종료 시")
    ]

    # 셀에 데이터 입력
    for row_idx, row in enumerate(cells_text):
        for col_idx, text in enumerate(row):
            hwp.PutFieldText(f"{{{{{row_idx + 1},{col_idx + 1}}}}}", text)

    # 문서 저장
    hwp.SaveAs("Privacy_Policy_Section6.hwp", "HWP", "")

    # 한글 종료
    hwp.Quit()

create_hwp_privacy_policy_section6()
