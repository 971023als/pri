import win32com.client as win32

def create_hwp_privacy_policy():
    hwp = win32.gencache.EnsureDispatch("HWPFrame.HwpObject")
    hwp.RegisterModule("FilePathCheckDLL", "FilePathCheckerModule")

    # 새 문서 만들기
    hwp.HAction.Run("FileNew")

    # 제목 추가
    hwp.HAction.GetDefault("InsertText", hwp.HParameterSet.HInsertText.HSet)
    hwp.HParameterSet.HInsertText.Text = "개인정보처리방침"
    hwp.HAction.Execute("InsertText", hwp.HParameterSet.HInsertText.HSet)

    # 페이지 나누기
    hwp.HAction.Run("BreakPage")

    # 개정 이력 추가
    hwp.HAction.GetDefault("InsertText", hwp.HParameterSet.HInsertText.HSet)
    hwp.HParameterSet.HInsertText.Text = "개정 이력\n"
    hwp.HAction.Execute("InsertText", hwp.HParameterSet.HInsertText.HSet)

    # 개정 이력 테이블 생성
    hwp.HAction.Run("TableCreate")
    hwp.HAction.GetDefault("TablePropertyDialog", hwp.HParameterSet.HTableCreation.HSet)
    hwp.HParameterSet.HTableCreation.Rows = 2
    hwp.HParameterSet.HTableCreation.Cols = 6
    hwp.HAction.Execute("TablePropertyDialog", hwp.HParameterSet.HTableCreation.HSet)

    # 테이블에 데이터 입력
    hwp.Run("MoveDocBegin")
    hwp.Run("SelectAll")
    hwp.Run("Cancel")
    hwp.Run("MoveRight")
    hwp.Run("MoveRight")
    table_data = [("개정번호", "개정일자", "개정자", "개정사유", "개정내용", "비고"),
                  ("v1.0.0", "00.00.00", "신규", "신규 개정", "-", "-")]
    for row in table_data:
        for cell in row:
            hwp.HAction.GetDefault("InsertText", hwp.HParameterSet.HInsertText.HSet)
            hwp.HParameterSet.HInsertText.Text = cell
            hwp.HAction.Execute("InsertText", hwp.HParameterSet.HInsertText.HSet)
            hwp.Run("MoveRight")
        hwp.Run("MoveDown")
        hwp.Run("MoveHome")

    # 목차 추가
    hwp.HAction.GetDefault("InsertText", hwp.HParameterSet.HInsertText.HSet)
    hwp.HParameterSet.HInsertText.Text = "\n목차\n제1조(개인정보의 처리목적) 페이지 2\n제2조(개인정보의 처리 및 보유기간) 페이지 3\n제3조(처리하는 개인정보의 항목) 페이지 5\n"
    hwp.HAction.Execute("InsertText", hwp.HParameterSet.HInsertText.HSet)

    # 개인정보 처리방침 본문
    hwp.HAction.GetDefault("InsertText", hwp.HParameterSet.HInsertText.HSet)
    hwp.HParameterSet.HInsertText.Text = "\n개인정보처리방침 본문\n" + ("여기에 개인정보처리방침의 본문 내용을 적어주세요.")
    hwp.HAction.Execute("InsertText", hwp.HParameterSet.HInsertText.HSet)

    # 문서 저장
    hwp.SaveAs("Privacy_Policy.hwp", "HWP", "")

    # 한글 종료
    hwp.Quit()

create_hwp_privacy_policy()
