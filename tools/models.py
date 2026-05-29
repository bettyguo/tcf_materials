"""Pydantic models defining the canonical frontmatter schema for every content file.

Schema source of truth. If you change it, write a migration under tools/migrations/.
"""

from __future__ import annotations

import re
import warnings
from enum import StrEnum

# `register` (linguistic register) is a domain term here; it shadows BaseModel.register (ABC
# subclass registration), which we never call on this model. Silence the unactionable warning.
warnings.filterwarnings("ignore", message=r'Field name "register".*shadows an attribute.*')

from pydantic import BaseModel, ConfigDict, Field, field_validator  # noqa: E402

ID_RE = re.compile(r"^[a-z]+-[a-z0-9]+(-[a-z0-9]+)*$")


class Section(StrEnum):
    LISTENING = "listening"
    READING = "reading"
    WRITING = "writing"
    SPEAKING = "speaking"
    GRAMMAR = "grammar"
    VOCAB = "vocab"
    STRATEGY = "strategy"
    MOCK = "mock"
    DIAGNOSTIC = "diagnostic"
    CULTURE = "culture"
    INDEX = "index"
    # Phase 1.1 (interactive site): browser-side utility pages (calculator, timer, quiz, checklist).
    TOOLS = "tools"


class CEFR(StrEnum):
    A1 = "A1"
    A2 = "A2"
    B1 = "B1"
    B2 = "B2"
    C1 = "C1"
    C2 = "C2"


class Register(StrEnum):
    FRANCE = "france"
    QUEBEC = "quebec"
    MIXED = "mixed"


class Confidence(StrEnum):
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"


class AuditStatus(StrEnum):
    PENDING = "pending"
    REVIEWED = "reviewed"
    CLEARED = "cleared"
    QUARANTINED = "quarantined"


class AudioSpec(BaseModel):
    model_config = ConfigDict(extra="forbid")

    required: bool = False
    voice: str | None = None
    duration_seconds: int | None = Field(default=None, ge=1, le=600)
    # Optional SSML prosody-rate override (e.g. "-5%", "+0%", "+10%"). Per Phase 3 §4.4 step 5.
    rate: str | None = None

    @field_validator("rate")
    @classmethod
    def _rate_format(cls, v: str | None) -> str | None:
        if v is None:
            return v
        if not re.fullmatch(r"[+-]\d{1,3}%", v):
            raise ValueError(f"audio.rate {v!r} must match /[+-]\\d{{1,3}}%/ (e.g. '-5%', '+10%')")
        return v


class FlashcardEntry(BaseModel):
    model_config = ConfigDict(extra="forbid")

    front: str
    back: str
    confidence: Confidence = Confidence.HIGH
    tags: list[str] = Field(default_factory=list)


class AuditBlock(BaseModel):
    model_config = ConfigDict(extra="forbid")

    status: AuditStatus = AuditStatus.PENDING
    reviewer: str | None = None
    confidence_overall: Confidence = Confidence.MEDIUM
    notes: str = ""


class Frontmatter(BaseModel):
    """Canonical frontmatter for every file under content/."""

    model_config = ConfigDict(extra="forbid", protected_namespaces=())

    id: str
    title: str
    section: Section
    cefr: CEFR
    nclc_target: int = Field(ge=1, le=12)
    estimated_minutes: int = Field(ge=1, le=240)
    register: Register = Register.FRANCE
    audio: AudioSpec = Field(default_factory=AudioSpec)
    sources: list[str] = Field(default_factory=list)
    tags: list[str] = Field(default_factory=list)
    flashcard: list[FlashcardEntry] = Field(default_factory=list)
    prerequisites: list[str] = Field(default_factory=list)
    audit: AuditBlock = Field(default_factory=AuditBlock)

    # Stub marker — TBD placeholder files referenced by the roadmap before their phase ships.
    stub: bool = False

    # MkDocs Material "hide" frontmatter: list of UI affordances to hide on this page
    # (e.g. ["navigation", "toc"]). Used by the homepage + landing pages.
    hide: list[str] = Field(default_factory=list)

    # Phase 3 additions (listening items): question typology per 04_PHASE_3_VOCAB_LISTENING.md §4.1,
    # thematic domain per §3, single-question mock-subset pointer per §4.2.
    question_type: int | None = Field(default=None, ge=1, le=7)
    thematic_domain: list[str] = Field(default_factory=list)
    mock_question_id: str | None = None

    # Phase 4 additions (reading items): density-band enforcement (R3) + Phase 5 stimulus lookup.
    # Per PHASE_4_DESIGN.md §3.2.
    word_count: int | None = Field(default=None, ge=30)
    lexical_density: float | None = Field(default=None, ge=0.0, le=1.0)
    usable_as_stimulus: bool = False

    # Phase 5 additions (writing items): tâche identifier + target length + register flag.
    # Per PHASE_5_DESIGN.md §3.1.
    task: int | None = Field(default=None, ge=1, le=3)
    target_words: int | None = Field(default=None, ge=30)
    register_required: str | None = None

    # Phase 6 addition (speaking items): mock-eligibility tag, mirrors usable_as_stimulus.
    # Per PHASE_6_DESIGN.md §3.1. Phase 7 mock assembly draws on this.
    usable_in_mock: bool = False

    @field_validator("register_required")
    @classmethod
    def _register_required_format(cls, v: str | None) -> str | None:
        if v is None:
            return v
        allowed = {"familier", "neutre", "formel", "soutenu"}
        if v not in allowed:
            raise ValueError(f"register_required {v!r} not in {sorted(allowed)}")
        return v

    @field_validator("mock_question_id")
    @classmethod
    def _mock_id_format(cls, v: str | None) -> str | None:
        if v is None:
            return v
        if not ID_RE.match(v):
            raise ValueError(f"mock_question_id {v!r} does not match {ID_RE.pattern}")
        return v

    @field_validator("id")
    @classmethod
    def _id_format(cls, v: str) -> str:
        if not ID_RE.match(v):
            raise ValueError(f"id {v!r} does not match {ID_RE.pattern}")
        return v

    @field_validator("sources", "prerequisites", mode="before")
    @classmethod
    def _none_to_empty(cls, v):
        return v or []
