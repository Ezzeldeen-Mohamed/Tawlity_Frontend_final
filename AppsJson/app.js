document.getElementById('searchInput').addEventListener('input', function() {
    var searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    var restaurantCards = document.querySelectorAll('.restaurant-card');
    
    restaurantCards.forEach(function(card) {
        var restaurantName = card.getAttribute('data-name').toLowerCase();
        
        if (restaurantName.includes(searchTerm)) {
            card.style.display = 'block'; // Show the card
        } else {
            card.style.display = 'none'; // Hide the card
        }
    });
});
