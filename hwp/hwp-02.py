import win32com.client as win32

def create_hwp_privacy_policy_section2():
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

    # 제2조 추가
    hwp.HAction.GetDefault("InsertText", hwp.HParameterSet.HInsertText.HSet)
    hwp.HParameterSet.HInsertText.Text = "제2조(개인정보의 처리 및 보유기간)"
    hwp.HAction.Execute("InsertText", hwp.HParameterSet.HInsertText.HSet)

    # 개인정보 처리 및 보유기간 내용 삽입
    retention_text = """
    ① 밥누리진흥공단은 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
    개인정보보호 종합 포털 (www.privacy.go.kr) → 개인정보민원 → 개인정보의 열람 등 요구 → 개인정보파일 목록 검색 → 기관 명에 “밥누리진흥공단”을 입력
    ② 각각의 개인정보 처리 및 보유 기간은 다음과 같습니다.
    가. 개인회원
    개인정보 파일명: 밥누리홈페이지 회원 정보
    운영 근거: 정보주체의 동의
    처리 항목: 필수: 아이디, 비밀번호, 성명, 이메일, 집주소
    보유기간: 계정 해지시까지, 최종 로그인부터 1년까지
    나. 기업회원
    개인정보 파일명: 밥누리홈페이지 회원 정보
    운영 근거: 정보주체의 동의
    처리 항목: 필수: 아이디, 비밀번호, 성명, 이메일, 집주소
    보유기간: 계정 해지시까지, 최종 로그인부터 1년까지
    """
    hwp.HAction.GetDefault("InsertText", hwp.HParameterSet.HInsertText.HSet)
    hwp.HParameterSet.HInsertText.Text = retention_text
    hwp.HAction.Execute("InsertText", hwp.HParameterSet.HInsertText.HSet)

    # 문서 저장
    hwp.SaveAs("Privacy_Policy_Section2.hwp", "HWP", "")

    # 한글 종료
    hwp.Quit()

create_hwp_privacy_policy_section2()
