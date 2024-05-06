import win32com.client as win32

# 한글 어플리케이션에 접근
hwp = win32.gencache.EnsureDispatch("HWPFrame.HwpObject")

# 새 문서 생성
hwp.HAction.GetDefault("FileNew", hwp.HParameterSet.HFileOpenSave.HSet)
hwp.HAction.Execute("FileNew", hwp.HParameterSet.HFileOpenSave.HSet)

# 제목 추가
hwp.HAction.GetDefault("InsertText", hwp.HParameterSet.HInsertText.HSet)
hwp.HParameterSet.HInsertText.Text = "제9조(개인정보 보호책임자의 성명 또는 개인정보 보호업무 및 관련 고충사항)"
hwp.HAction.Execute("InsertText", hwp.HParameterSet.HInsertText.HSet)

# 내용 추가
contents = [
    "① 밥누리 진흥공단은 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보보호 책임자를 지정하고 있습니다.",
    "▶ 개인정보 보호책임자",
    "- 성명 : 000",
    "- 부서명 : 000",
    "- 전화번호 : 000-0000-0000",
    "- 이메일 : alsguddl@gmail.com",
    "▶ 개인정보보호 담당부서",
    "- 성명 : 000",
    "- 부서명 : 000",
    "- 전화번호 : 000-0000-0000",
    "- 이메일 : alsguddl@gmail.com",
    "② 정보주체는 협의회의 서비스를 이용하시면서 발생한 모든 개인정보 보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의하실 수 있습니다. 협의회는 정보주체의 문의에 대해 지체 없이 답변 및 처리해 드릴 것입니다."
]

for content in contents:
    hwp.HAction.GetDefault("InsertText", hwp.HParameterSet.HInsertText.HSet)
    hwp.HParameterSet.HInsertText.Text = content
    hwp.HAction.Execute("InsertText", hwp.HParameterSet.HInsertText.HSet)

# 문서 저장 및 종료
hwp.HAction.GetDefault("FileSaveAs", hwp.HParameterSet.HFileOpenSave.HSet)
hwp.HParameterSet.HFileOpenSave.filename = "Article_9_Privacy_Officer.hwp"
hwp.HParameterSet.HFileOpenSave.Format = "HWP"
hwp.HAction.Execute("FileSaveAs", hwp.HParameterSet.HFileOpenSave.HSet)

hwp.Quit()
