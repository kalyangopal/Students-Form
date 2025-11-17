
        let count = 0;

        function addStudent() {
            const name = document.getElementById("name").value;
            const courses = document.getElementById("courses").value;
            const mobileNumber = document.getElementById("mobileNumber").value;
            const joiningDate = document.getElementById("joiningDate").value;
            const completedDate= document.getElementById("completedDate").value;
            const Payment1 = document.getElementById("Payment1").value;
            const Payment2 = document.getElementById("Payment2").value;
            const Payment3 = document.getElementById("Payment3").value;
             const totalFees = document.getElementById("totalFees").value;
            const Balance = document.getElementById("Balance").value;
           
            const status = document.querySelector('input[name="status"]:checked');

            // Validation
            if (!name || !courses || !mobileNumber || !joiningDate || !completedDate || 
                !Payment1 || !Payment2 || !Payment3 ||  !totalFees || !Balance || !status) {
                alert("⚠ Please fill all fields before submitting.");
                return;
            }

            count++;

            const table = document.getElementById("studentTable").getElementsByTagName("tbody")[0];
            const row = table.insertRow();

            row.insertCell(0).innerText = count;
            row.insertCell(1).innerText = name;
            row.insertCell(2).innerText = courses;
            row.insertCell(3).innerText = mobileNumber;
            row.insertCell(4).innerText = joiningDate;
            row.insertCell(5).innerText = completedDate;
            row.insertCell(6).innerText = Payment1;
            row.insertCell(7).innerText = Payment2;
            row.insertCell(8).innerText = Payment3;
            row.insertCell(9).innerText = totalFees;
            row.insertCell(10).innerText = Balance;

            // Status with color
            const statusCell = row.insertCell(11);
            statusCell.innerText = status.value;
            statusCell.className = status.value === "Completed" 
                ? "text-green-600 font-bold"
                : "text-red-600 font-bold";

            // Delete Button
            const deleteCell = row.insertCell(12);
            deleteCell.innerHTML = `
                <button onclick="deleteRow(this)" 
                    class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded">
                    Delete
                </button>
            `;

            // Reset Form
            document.querySelectorAll("input").forEach(input => input.value = "");
            document.querySelectorAll('input[name="status"]').forEach(r => r.checked = false);
        }

        function deleteRow(button) {
            const row = button.parentNode.parentNode;
            row.remove();

            // Reorder SL numbers
            const rows = document.querySelectorAll("#studentTable tbody tr");
            rows.forEach((r, index) => r.cells[0].innerText = index + 1);
            count = rows.length;
        }

        function exportToExcel() {
            const table = document.getElementById("studentTable");
            const workbook = XLSX.utils.table_to_book(table, { sheet: "Students" });
            XLSX.writeFile(workbook, "students.xlsx");
        }
   