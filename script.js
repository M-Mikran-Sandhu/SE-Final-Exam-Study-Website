/* ============================================================================
   SIMPLIFIED EXAM PREP WEBSITE - JAVASCRIPT
   Handles navigation, quiz checking, and responsive menu
   ============================================================================ */

// ============================================================================
// CORRECT ANSWERS FOR QUIZZES
// ============================================================================

const answers = {
    lecture11: { q11: 'a', q12: 'b' },
    lecture12: { q21: 'b', q22: 'b' },
    lecture13: { q31: 'a', q32: 'b' },
    lecture14: { q41: 'b', q42: 'a' },
    lecture15: { q51: 'a', q52: 'a' }
};

// ============================================================================
// DOM ELEMENTS
// ============================================================================

const navLinks = document.querySelectorAll('.nav-link');
const lectureSections = document.querySelectorAll('.lecture-section');
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.querySelector('.sidebar');

// ============================================================================
// NAVIGATION FUNCTIONALITY
// ============================================================================

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        const sectionId = this.getAttribute('data-section');
        
        // Remove active class from all links and sections
        navLinks.forEach(l => l.classList.remove('active'));
        lectureSections.forEach(s => s.classList.remove('active'));
        
        // Add active class to clicked link and corresponding section
        this.classList.add('active');
        document.getElementById(sectionId).classList.add('active');
        
        // Close sidebar on mobile
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('show');
        }
        
        // Scroll to top
        window.scrollTo(0, 0);
    });
});

// ============================================================================
// MOBILE MENU TOGGLE
// ============================================================================

function updateMenuButton(isOpen) {
    if (isOpen) {
        menuBtn.innerHTML = '<span class="menu-icon">✕</span><span class="menu-text"> Close</span>';
    } else {
        menuBtn.innerHTML = '<span class="menu-icon">☰</span><span class="menu-text"> Menu</span>';
    }
}

menuBtn.addEventListener('click', function() {
    const isOpen = !sidebar.classList.contains('show');
    sidebar.classList.toggle('show');
    updateMenuButton(isOpen);
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    if (window.innerWidth <= 768) {
        if (!event.target.closest('.sidebar') && !event.target.closest('.menu-btn')) {
            sidebar.classList.remove('show');
            updateMenuButton(false);
        }
    }
});

// ============================================================================
// QUIZ CHECKING FUNCTION
// ============================================================================

function checkQuiz(lectureId) {
    const lectureAnswers = answers[lectureId];
    let score = 0;
    let totalQuestions = Object.keys(lectureAnswers).length;
    
    // Check each answer
    for (let questionId in lectureAnswers) {
        const selectedAnswer = document.querySelector(`input[name="${questionId}"]:checked`);
        
        if (selectedAnswer && selectedAnswer.value === lectureAnswers[questionId]) {
            score++;
        }
    }
    
    // Calculate percentage
    const percentage = Math.round((score / totalQuestions) * 100);
    
    // Show result
    showResult(lectureId, score, totalQuestions, percentage);
}

// ============================================================================
// SHOW QUIZ RESULT
// ============================================================================

function showResult(lectureId, score, total, percentage) {
    const section = document.getElementById(lectureId);
    const quiz = section.querySelector('.quiz');
    
    // Remove previous result if exists
    const previousResult = quiz.querySelector('.result-message');
    if (previousResult) {
        previousResult.remove();
    }
    
    // Create result message
    const resultDiv = document.createElement('div');
    resultDiv.className = 'result-message';
    
    if (percentage >= 80) {
        resultDiv.classList.add('correct');
        resultDiv.innerHTML = `
            ✅ Excellent! You got ${score}/${total} correct (${percentage}%)<br>
            <small>You're ready for the exam!</small>
        `;
    } else if (percentage >= 60) {
        resultDiv.classList.add('correct');
        resultDiv.innerHTML = `
            👍 Good! You got ${score}/${total} correct (${percentage}%)<br>
            <small>Review the topics you missed</small>
        `;
    } else {
        resultDiv.classList.add('incorrect');
        resultDiv.innerHTML = `
            ⚠️ You got ${score}/${total} correct (${percentage}%)<br>
            <small>Review the topics and try again</small>
        `;
    }
    
    // Add result to quiz
    quiz.appendChild(resultDiv);
    
    // Scroll to result
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ============================================================================
// RESPONSIVE SIDEBAR ON WINDOW RESIZE
// ============================================================================

window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        sidebar.classList.remove('show');
        updateMenuButton(false);
    }
});

// ============================================================================
// INITIALIZE ON PAGE LOAD
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    // First lecture is active by default
    document.getElementById('lecture11').classList.add('active');
    document.querySelector('[data-section="lecture11"]').classList.add('active');
});