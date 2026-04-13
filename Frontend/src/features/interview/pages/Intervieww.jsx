import React, { useState ,useEffect} from "react";
import "../style/interview.scss";
import { useInterview } from "../hooks/useInterview";
import { useNavigate,useParams } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth"
const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
]

// ── Sub-components ────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
    const [ open, setOpen ] = useState(false)
    return (
        <div className='q-card'>
            <div className='q-card__header' onClick={() => setOpen(o => !o)}>
                <span className='q-card__index'>Q{index + 1}</span>
                <p className='q-card__question'>{item.question}</p>
                <span className={`q-card__chevron ${open ? 'q-card__chevron--open' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>
            {open && (
                <div className='q-card__body'>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--intention'>Intention</span>
                        <p>{item.intention}</p>
                    </div>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--answer'>Model Answer</span>
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

// ── Main Component ────────────────────────────────────────────────────────────
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

                {/* MAIN CONTENT */}
                <main className='interview-content'>
                    {activeNav === 'technical' && (
                        <section>
                            <h2>Technical Questions</h2>
                            {report.technicalQuestions.map((q, i) => (
                                <div key={i} className="q-card">
                                    <p><strong>Q{i+1}:</strong> {q.question}</p>
                                </div>
                            ))}
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section>
                            <h2>Behavioral Questions</h2>
                            {report.behavioralQuestions.map((q, i) => (
                                <div key={i} className="q-card">
                                    <p><strong>Q{i+1}:</strong> {q.question}</p>
                                </div>
                            ))}
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section>
                            <h2>Roadmap</h2>
                            {report.preparationPlan.map((day, i) => (
                                <div key={i} className="q-card">
                                    <p><strong>Day {day.day}:</strong> {day.focus}</p>
                                </div>
                            ))}
                        </section>
                    )}
                </main>

            </div>
        </div>
    )
}

export default Interview;