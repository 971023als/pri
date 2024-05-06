import win32com.client as win32

# 한글 어플리케이션에 접근
hwp = win32.gencache.EnsureDispatch("HWPFrame.HwpObject")

# 새 문서 생성
hwp.HAction.GetDefault("FileNew", hwp.HParameterSet.HFileOpenSave.HSet)
hwp.HAction.Execute("FileNew", hwp.HParameterSet.HFileOpenSave.HSet)

# 내용 추가
contents = [
    "여기에 문서 제목이 들어갑니다.",
    "본문 내용이 이곳에 추가됩니다. 여러 줄에 걸쳐 내용을 추가할 수 있습니다."
]

for content in contents:
    hwp.HAction.GetDefault("InsertText", hwp.HParameterSet.HInsertText.HSet)
    hwp.HParameterSet.HInsertText.Text = content
    hwp.HAction.Execute("InsertText", hwp.HParameterSet.HInsertText.HSet)

# 문서 저장
hwp.HAction.GetDefault("FileSaveAs", hwp.HParameterSet.HFileOpenSave.HSet)
hwp.HParameterSet.HFileOpenSave.filename = "Generated_Document.hwp"
hwp.HParameterSet.HFileOpenSave.Format = "HWP"
hwp.HAction.Execute("FileSaveAs", hwp.HParameterSet.HFileOpenSave.HSet)

# 한글 어플리케이션 종료
hwp.Quit()
