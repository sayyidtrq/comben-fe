document.addEventListener('DOMContentLoaded', function() {
  const ctx = document.getElementById('licenseChart');
  if (ctx) {
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Aman (>30 hari)', 'Expiring (7-30 hari)', 'Expiring (<7 hari)', 'Expired'],
        datasets: [{
          data: [3842, 604, 240, 96],
          backgroundColor: [
            '#10B981', // Aman (Green)
            '#FBBF24', // Expiring 7-30 (Yellow-Orange)
            '#F97316', // Expiring <7 (Orange)
            '#EF4444'  // Expired (Red)
          ],
          borderWidth: 0,
          cutout: '75%'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false // Hide default legend since we build a custom one in HTML
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                let label = context.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed !== null) {
                  label += context.parsed;
                }
                return label;
              }
            }
          }
        }
      }
    });
  }
});
