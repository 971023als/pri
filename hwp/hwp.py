import subprocess

# 스크립트 파일 이름 목록
script_files = [f"hwp-{i:02}.py" for i in range(0, 13)]

# 각 스크립트 실행
for script in script_files:
    # subprocess.run을 사용해 Python 스크립트 실행
    # Python 실행 경로와 스크립트 파일 경로를 정확히 지정해야 함
    subprocess.run(["python", script], check=True)

print("모든 스크립트 실행 완료")
