import win32com.client as win32

def create_hwp_privacy_policy_section3():
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

    # 제3조 제목 추가
    hwp.HAction.GetDefault("InsertText", hwp.HParameterSet.HInsertText.HSet)
    hwp.HParameterSet.HInsertText.Text = "제3조(처리하는 개인정보의 항목)"
    hwp.HAction.Execute("InsertText", hwp.HParameterSet.HInsertText.HSet)

    # 테이블 생성
    hwp.HAction.Run("TableCreate")
    hwp.HAction.GetDefault("TableCreate", hwp.HParameterSet.HTableCreation.HSet)
    hwp.HParameterSet.HTableCreation.Rows = 12
    hwp.HParameterSet.HTableCreation.Cols = 5
    hwp.HParameterSet.HTableCreation.Create = True
    hwp.HAction.Execute("TableCreate", hwp.HParameterSet.HTableCreation.HSet)

    # 테이블 셀에 데이터 삽입
    # 예: 1행 1열 셀에 "개인정보 파일명" 삽입
    hwp.Run("TableCellBlock")
    hwp.HAction.GetDefault("InsertText", hwp.HParameterSet.HInsertText.HSet)
    hwp.HParameterSet.HInsertText.Text = "개인정보 파일명"
    hwp.HAction.Execute("InsertText", hwp.HParameterSet.HInsertText.HSet)
    # 다른 셀도 같은 방식으로 삽입 필요

    # 문서 저장
    hwp.SaveAs("Privacy_Policy_Section3.hwp", "HWP", "")

    # 한글 종료
    hwp.Quit()

create_hwp_privacy_policy_section3()
