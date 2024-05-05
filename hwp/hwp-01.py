import win32com.client as win32

def create_hwp_privacy_policy_section():
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

    # 제1조 추가
    hwp.HAction.GetDefault("InsertText", hwp.HParameterSet.HInsertText.HSet)
    hwp.HParameterSet.HInsertText.Text = "제1조(개인정보의 처리목적)"
    hwp.HAction.Execute("InsertText", hwp.HParameterSet.HInsertText.HSet)

    # 개인정보 처리목적 내용 삽입
    purpose_text = """
    ① 밥누리진흥공단은 개인정보를 다음의 목적을 위해 처리합니다. 처리한 개인정보는 다음의 목적 이외의 용도로는 사용되지 않으며, 이용 목적이 변경될 시에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행하고 있습니다.
    ② 개인정보보호법 제32조에 따라 등록, 공개하는 개인정보 파일의 처리 목적은 다음과 같습니다.
    가. 개인회원
    밥누리홈페이지 회원 정보
    운영 근거: 정보주체의 동의
    처리 목적: 밥누리홈페이지 서비스 제공을 위한 회원 관리
    밥누리홈페이지 미성년자 회원의 법정 대리인 정보
    운영 근거: 정보주체의 동의
    처리 목적: 밥누리홈페이지 서비스 제공을 위한 회원 관리

    나. 기업회원
    밥누리홈페이지 회원 정보
    운영 근거: 정보주체의 동의
    처리 목적: 밥누리홈페이지 서비스 제공을 위한 회원 관리
    밥누리홈페이지 미성년자 회원의 법정 대리인 정보
    운영 근거: 정보주체의 동의
    처리 목적: 밥누리홈페이지 서비스 제공을 위한 회원 관리
    창업 자금 대출 신청자 정보
    운영 근거: 정보주체의 동의 및 여러 법률 규정
    처리 목적: 소상공인 창업 자금 지원

    창업 기술 교육 신청자 정보, 창업 컨설팅 신청자 정보 등 추가적인 정보...
    """
    hwp.HAction.GetDefault("InsertText", hwp.HParameterSet.HInsertText.HSet)
    hwp.HParameterSet.HInsertText.Text = purpose_text
    hwp.HAction.Execute("InsertText", hwp.HParameterSet.HInsertText.HSet)

    # 문서 저장
    hwp.SaveAs("Privacy_Policy_Section1.hwp", "HWP", "")

    # 한글 종료
    hwp.Quit()

create_hwp_privacy_policy_section()
