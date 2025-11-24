// Browse skills page functionality
document.addEventListener('DOMContentLoaded', function() {
    const skillsData = [
        {
            id: 1,
            title: "Web Development",
            description: "HTML, CSS, JavaScript basics and modern frameworks",
            category: "technology",
            level: "intermediate",
            user: "Alex Chen"
        },
        {
            id: 2,
            title: "Graphic Design",
            description: "Photoshop, Canva, and UI/UX design principles",
            category: "creative",
            level: "beginner",
            user: "Sarah Johnson"
        },
        {
            id: 3,
            title: "Spanish Language",
            description: "Conversational Spanish for beginners",
            category: "languages",
            level: "beginner",
            user: "Maria Rodriguez"
        },
        {
            id: 4,
            title: "Photography",
            description: "Digital photography and composition techniques",
            category: "creative",
            level: "intermediate",
            user: "Mike Thompson"
        },
        {
            id: 5,
            title: "Cooking - Local Cuisine",
            description: "Traditional Kurdish and Middle Eastern dishes",
            category: "life-skills",
            level: "advanced",
            user: "Amina Hassan"
        },
        {
            id: 6,
            title: "Math Tutoring",
            description: "High school and university level mathematics",
            category: "academic",
            level: "advanced",
            user: "Dr. Ahmed Ali"
        },
        {
            id: 7,
            title: "Fitness Training",
            description: "Home workouts and fitness planning",
            category: "sports",
            level: "intermediate",
            user: "James Wilson"
        },
        {
            id: 8,
            title: "English Conversation",
            description: "Practice speaking English in casual settings",
            category: "languages",
            level: "intermediate",
            user: "Emily Davis"
        }
    ];

    const skillsContainer = document.getElementById('skillsContainer');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const levelFilter = document.getElementById('levelFilter');
    const noResults = document.getElementById('noResults');

    // Initial render
    renderSkills(skillsData);

    // Event listeners for filters
    searchInput.addEventListener('input', filterSkills);
    categoryFilter.addEventListener('change', filterSkills);
    levelFilter.addEventListener('change', filterSkills);

    function renderSkills(skills) {
        skillsContainer.innerHTML = '';
        
        if (skills.length === 0) {
            noResults.style.display = 'block';
            return;
        }
        
        noResults.style.display = 'none';
        
        skills.forEach(skill => {
            const skillCard = document.createElement('div');
            skillCard.className = 'skill-card';
            skillCard.innerHTML = `
                <h3>${skill.title}</h3>
                <p>${skill.description}</p>
                <div class="skill-meta">
                    <span class="skill-user">👤 ${skill.user}</span>
                    <span class="skill-level ${skill.level}">${skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}</span>
                </div>
                <div class="skill-category">${getCategoryIcon(skill.category)} ${skill.category.charAt(0).toUpperCase() + skill.category.slice(1)}</div>
            `;
            skillsContainer.appendChild(skillCard);
        });
    }

    function filterSkills() {
        const searchTerm = searchInput.value.toLowerCase();
        const categoryValue = categoryFilter.value;
        const levelValue = levelFilter.value;

        const filteredSkills = skillsData.filter(skill => {
            const matchesSearch = skill.title.toLowerCase().includes(searchTerm) || 
                                skill.description.toLowerCase().includes(searchTerm);
            const matchesCategory = !categoryValue || skill.category === categoryValue;
            const matchesLevel = !levelValue || skill.level === levelValue;

            return matchesSearch && matchesCategory && matchesLevel;
        });

        renderSkills(filteredSkills);
    }

    function getCategoryIcon(category) {
        const icons = {
            'technology': '💻',
            'languages': '🗣️',
            'creative': '🎨',
            'academic': '📚',
            'sports': '⚽',
            'life-skills': '🔧'
        };
        return icons[category] || '🌟';
    }
});