import React, { useState ,useEffect} from "react";
import "../style/interview.scss";
import { useInterview } from "../hooks/useInterview";
import { useParams } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth"

const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions' },
    { id: 'behavioral', label: 'Behavioral Questions' },
    { id: 'roadmap', label: 'Road Map' },
]

// 🔥 QUESTION CARD (KEEP ANSWERS)
const QuestionCard = ({ item, index }) => {
    const [ open, setOpen ] = useState(false)

    return (
        <div className='q-card'>
            <div className='q-card__header' onClick={() => setOpen(!open)}>
                <span className='q-card__index'>Q{index + 1}</span>
                <p className='q-card__question'>{item.question}</p>
            </div>

            {open && (
                <div className='q-card__body'>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--answer'>Answer</span>
                        <p>{item.answer}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className='roadmap-day'>
        <div className='roadmap-day__header'>
            <span className='roadmap-day__badge'>Day {day.day}</span>
            <h3 className='roadmap-day__focus'>{day.focus}</h3>
        </div>

        <ul className='roadmap-day__tasks'>
            {day.tasks.map((task, i) => (
                <li key={i}>
                    <span className='roadmap-day__bullet' />
                    {task}
                </li>
            ))}
        </ul>
    </div>
)
const Interview = () => {
    const { handleLogout } = useAuth()
    const [ activeNav, setActiveNav ] = useState('technical')
    const [menuOpen, setMenuOpen] = useState(false)

    const { report, getReportById, loading, getResumePdf } = useInterview()
    const { interviewId } = useParams()

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        }
    }, [ interviewId ])

    if (loading || !report) {
        return (
            <main className='loading-screen'>
                <h1>Loading your interview plan...</h1>
            </main>
        )
    }

    const scoreColor =
        report.matchScore >= 80 ? 'score--high' :
        report.matchScore >= 60 ? 'score--mid' : 'score--low'

    return (
        <div className='interview-page'>

            {/* MOBILE MENU BUTTON */}
            <button 
                className="mobile-menu-btn"
                onClick={() => setMenuOpen(true)}
            >
                ☰
            </button>

            <div className='interview-layout'>

                {/* SIDEBAR */}
                <nav className={`interview-nav ${menuOpen ? "open" : ""}`}>

                    <button 
                        className="close-btn"
                        onClick={() => setMenuOpen(false)}
                    >
                        ✕
                    </button>

                    <div className="nav-content">
                        <p className='interview-nav__label'>Sections</p>

                        {NAV_ITEMS.map(item => (
                            <button
                                key={item.id}
                                className={`interview-nav__item ${activeNav === item.id ? 'interview-nav__item--active' : ''}`}
                                onClick={() => {
                                    setActiveNav(item.id)
                                    setMenuOpen(false)
                                }}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="nav-actions">
                        <button
                            onClick={() => getResumePdf(interviewId)}
                            className='primary-button'>
                            ✨ Download Resume
                        </button>

                        <button
                            className="logout-button"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </nav>

                <div className='interview-divider' />

                {/* MAIN CONTENT */}
                <main className='interview-content'>

                    {activeNav === 'technical' && (
                        <section>
                            <div className='content-header'>
                                <h2>Technical Questions</h2>
                                <span className='content-header__count'>
                                    {report.technicalQuestions.length} questions
                                </span>
                            </div>

                            <div className='q-list'>
                                {report.technicalQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section>
                            <div className='content-header'>
                                <h2>Behavioral Questions</h2>
                                <span className='content-header__count'>
                                    {report.behavioralQuestions.length} questions
                                </span>
                            </div>

                            <div className='q-list'>
                                {report.behavioralQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section>
                            <div className='content-header'>
                                <h2>Preparation Road Map</h2>
                            </div>

                            <div className='roadmap-list'>
                                {report.preparationPlan.map((day) => (
                                    <RoadMapDay key={day.day} day={day} />
                                ))}
                            </div>
                        </section>
                    )}

                </main>

                <div className='interview-divider' />

                {/* RIGHT SIDEBAR (MATCH SCORE) */}
                <aside className='interview-sidebar'>

                    <div className='match-score'>
                        <p className='match-score__label'>Match Score</p>
                        <div className={`match-score__ring ${scoreColor}`}>
                            <span className='match-score__value'>{report.matchScore}</span>
                            <span className='match-score__pct'>%</span>
                        </div>
                        <p className='match-score__sub'>Match for this role</p>
                    </div>

                    <div className='sidebar-divider' />

                    <div className='skill-gaps'>
                        <p className='skill-gaps__label'>Skill Gaps</p>
                        <div className='skill-gaps__list'>
                            {report.skillGaps.map((gap, i) => (
                                <span key={i} className={`skill-tag skill-tag--${gap.severity}`}>
                                    {gap.skill}
                                </span>
                            ))}
                        </div>
                    </div>

                </aside>

            </div>
        </div>
    )
}

export default Interview;