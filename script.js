document.querySelectorAll('.subject').forEach(subject => {
    subject.addEventListener('click', () => {
        if (!subject.classList.contains('approved')) {
            subject.classList.add('approved');
            unlockRequirements(subject);
        }
    });
});

function unlockRequirements(subject) {
    const requirements = JSON.parse(subject.getAttribute('data-requirements'));
    requirements.forEach(req => {
        const reqSubject = Array.from(document.querySelectorAll('.subject')).find(s => s.textContent === req);
        if (reqSubject) {
            reqSubject.classList.remove('locked');
        }
    });
}
