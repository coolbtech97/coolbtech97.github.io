// Sample data for charts
const weeklyEngagementData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [{
        label: 'Activities Participated',
        data: [12, 19, 10, 15], // Dummy data
        backgroundColor: '#4a69bd',
        borderColor: '#4a69bd',
        borderWidth: 1,
        borderRadius: 5,
    }]
};

const activityBreakdownData = {
    labels: ['Classes', 'Events', 'Clubs', 'Assignments', 'Workshops'],
    datasets: [{
        data: [25, 15, 20, 30, 10], // Dummy data
        backgroundColor: ['#4a69bd', '#28a745', '#ffc107', '#dc3545', '#17a2b8'],
        hoverOffset: 4
    }]
};

// Configuration for charts
const weeklyEngagementConfig = {
    type: 'bar',
    data: weeklyEngagementData,
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
};

const activityBreakdownConfig = {
    type: 'pie',
    data: activityBreakdownData,
    options: {
        responsive: true,
    }
};

// Render charts
window.onload = function() {
    const weeklyEngagementCtx = document.getElementById('weeklyEngagementChart').getContext('2d');
    new Chart(weeklyEngagementCtx, weeklyEngagementConfig);

    const activityBreakdownCtx = document.getElementById('activityBreakdownChart').getContext('2d');
    new Chart(activityBreakdownCtx, activityBreakdownConfig);
};