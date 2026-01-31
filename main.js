const courses = {
    '1': {
        name: 'تحليل الأزمات السياسة الدولية',
        day: 'الأحد',
        time: '12:00 - 14:00',
        id: '1000'
    },
    '2': {
        name: 'تحليل السياسة الخارجية الدولية',
        day: 'الثلاثاء',
        time: '12:00 - 14:00',
        id: '2000'
    },
    '3': {
        name: 'المنظمات الإقليمية والدولية',
        day: 'الأربعاء',
        time: '12:00 - 14:00',
        id: '3000'
    }
};

const meetLink = 'https://meet.google.com/rzw-rnwi-nyn';
let currentCourseKey = null;

function openAuthModal(courseKey) {
    currentCourseKey = courseKey;
    const course = courses[courseKey];
    document.getElementById('modalTitle').innerText = course.name;
    document.getElementById('authModal').style.display = 'flex';
    document.getElementById('studentId').value = '';
    document.getElementById('studentId').focus();
    document.getElementById('errorMessage').innerText = '';
}

function closeModal() {
    document.getElementById('authModal').style.display = 'none';
    currentCourseKey = null;
}

function validateAccess() {
    const enteredId = document.getElementById('studentId').value;
    const requiredId = courses[currentCourseKey].id;

    if (enteredId === requiredId) {
        window.location.href = meetLink;
    } else {
        const errorEl = document.getElementById('errorMessage');
        errorEl.innerText = 'رقم الطالب غير صحيح لهذا المساق';
        errorEl.style.color = '#ff5252';

        // Shake effect
        const modal = document.querySelector('.modal-content');
        modal.style.animation = 'shake 0.5s';
        setTimeout(() => modal.style.animation = '', 500);
    }
}

// Close modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById('authModal');
    if (event.target == modal) {
        closeModal();
    }
}

// Enter key support
document.getElementById('studentId')?.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        validateAccess();
    }
});
