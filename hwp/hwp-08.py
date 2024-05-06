import win32com.client as win32

# 한글 어플리케이션에 접근
hwp = win32.gencache.EnsureDispatch("HWPFrame.HwpObject")

# 새 문서 생성
hwp.HAction.GetDefault("FileNew", hwp.HParameterSet.HFileOpenSave.HSet)
hwp.HAction.Execute("FileNew", hwp.HParameterSet.HFileOpenSave.HSet)

# 내용 추가
contents = [
    "제8조(개인정보의 안전성 확보조치에 관한 사항)",
    "① 밥누리진흥공단은 개인정보보호법 제29조에 따라 다음과 같이 안전성 확보에 필요한 기술적/관리적 및 물리적 조치를 하고 있습니다.",
    "1. 개인정보 취급 직원의 최소화 및 교육: 개인정보를 취급하는 직원을 지정하고 담당자에 한정시켜 최소화하여 개인정보를 관리하는 대책을 시행하고 있습니다.",
    # 나머지 내용 추가...
]

for content in contents:
    hwp.HAction.GetDefault("InsertText", hwp.HParameterSet.HInsertText.HSet)
    hwp.HParameterSet.HInsertText.Text = content
    hwp.HAction.Execute("InsertText", hwp.HParameterSet.HInsertText.HSet)

# 문서 저장
hwp.HAction.GetDefault("FileSaveAs", hwp.HParameterSet.HFileOpenSave.HSet)
hwp.HParameterSet.HFileOpenSave.filename = "Article_8_Security_Measures.hwp"
hwp.HParameterSet.HFileOpenSave.Format = "HWP"
hwp.HAction.Execute("FileSaveAs", hwp.HParameterSet.HFileOpenSave.HSet)

# 한글 어플리케이션 종료
hwp.Quit()
