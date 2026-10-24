import os
import runpy
import sys
from pathlib import Path

app_dir = Path(__file__).resolve().parent / "Main App"
sys.path.insert(0, str(app_dir))
os.chdir(app_dir)

runpy.run_path(str(app_dir / "main.py"), run_name="__main__")
