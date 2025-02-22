// admin_dashboard.js
document.addEventListener('DOMContentLoaded', function() {
    let maids = []; // Array to store maid profiles (replace with database fetch later)
    const maidModal = document.getElementById('maidModal');
    const maidForm = document.getElementById('maidForm');
    const maidProfilesList = document.getElementById('maidProfilesList');
    const addNewMaidBtn = document.getElementById('addNewMaidBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // Open the modal for adding a new maid profile
    addNewMaidBtn.addEventListener('click', function() {
        resetForm();
        maidModal.style.display = 'flex'; // Show the modal
    });

    // Close the modal
    closeModalBtn.addEventListener('click', function() {
        maidModal.style.display = 'none'; // Hide the modal
    });

    // Handle form submission (add/edit maid)
    maidForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the form from refreshing the page

        const maidName = document.getElementById('maidName').value;
        const maidLocation = document.getElementById('maidLocation').value;
        const maidExperience = document.getElementById('maidExperience').value;
        const leaveReason = document.getElementById('leaveReason').value;
        const maidSkills = document.getElementById('maidSkills').value;
        const availabilityStatus = document.getElementById('availabilityStatus').value;
        const contactNumber = document.getElementById('contactNumber').value;
        const emergencyContact = document.getElementById('emergencyContact').value;
        const maidPhoto = document.getElementById('maidPhoto').files[0];

        const maidProfile = {
            name: maidName,
            location: maidLocation,
            experience: maidExperience,
            leaveReason: leaveReason,
            skills: maidSkills,
            availability: availabilityStatus,
            contactNumber: contactNumber,
            emergencyContact: emergencyContact,
            photo: maidPhoto ? URL.createObjectURL(maidPhoto) : null
        };

        if (maids.some(maid => maid.name === maidName)) {
            // Update existing maid profile
            const index = maids.findIndex(maid => maid.name === maidName);
            maids[index] = maidProfile;
        } else {
            // Add new maid profile
            maids.push(maidProfile);
        }

        updateMaidList();
        maidModal.style.display = 'none'; // Hide the modal after submission
    });

    // Delete maid profile
    function deleteMaid(maidName) {
        maids = maids.filter(maid => maid.name !== maidName);
        updateMaidList();
    }

    // Update the list of maids in the table
    function updateMaidList() {
        maidProfilesList.innerHTML = '';
        maids.forEach(maid => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${maid.name}</td>
                <td>${maid.location}</td>
                <td>${maid.experience} years</td>
                <td>${maid.availability}</td>
                <td>
                    <button onclick="editMaid('${maid.name}')">Edit</button>
                    <button onclick="deleteMaid('${maid.name}')">Delete</button>
                </td>
            `;
            maidProfilesList.appendChild(row);
        });
    }

    // Edit maid profile
    function editMaid(maidName) {
        const maid = maids.find(maid => maid.name === maidName);
        document.getElementById('maidName').value = maid.name;
        document.getElementById('maidLocation').value = maid.location;
        document.getElementById('maidExperience').value = maid.experience;
        document.getElementById('leaveReason').value = maid.leaveReason;
        document.getElementById('maidSkills').value = maid.skills;
        document.getElementById('availabilityStatus').value = maid.availability;
        document.getElementById('contactNumber').value = maid.contactNumber;
        document.getElementById('emergencyContact').value = maid.emergencyContact;
        maidModal.style.display = 'flex';
    }

    // Reset form
    function resetForm() {
        maidForm.reset();
    }

    // Initialize maid profiles
    updateMaidList();
});
