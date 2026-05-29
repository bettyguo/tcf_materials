"""Pytest fixtures and shared helpers."""

from __future__ import annotations

import shutil
from pathlib import Path

import pytest

from tools._common import CONTENT_DIR, REPO_ROOT, iter_loaded


@pytest.fixture(scope="session")
def repo_root() -> Path:
    return REPO_ROOT


@pytest.fixture(scope="session")
def content_dir() -> Path:
    return CONTENT_DIR


@pytest.fixture(scope="session")
def all_content() -> list:
    """Pre-load every content file. Fails the suite collectively if any file errors out."""
    out = []
    for lc in iter_loaded(strict=True):
        if isinstance(lc, Exception):
            # Re-raise as the test using this fixture will surface it cleanly.
            raise lc
        out.append(lc)
    return out


def has(cmd: str) -> bool:
    return shutil.which(cmd) is not None
