document.addEventListener("DOMContentLoaded", function () {
    const shelf1 = document.getElementById("shelf1");
    const shelf2 = document.getElementById("shelf2");
    const newBookButton = document.getElementById("newBookButton");
    const deleteBookButton = document.getElementById("deleteBookButton");
    const modal = document.getElementById("modal");
    const bookForm = document.getElementById("bookForm");

    let books = [];

    function renderBooks() {
        shelf1.innerHTML = "";
        shelf2.innerHTML = "";
        books.forEach((book, index) => {
            const bookDiv = document.createElement("div");
            bookDiv.classList.add("book");
            bookDiv.innerHTML = `
                <img src="${book.image}" alt="${book.title}">
                <p>${book.title}</p>
                <p>${book.author}</p>
                <button class="delete-button">حذف</button>
            `;
            if (index % 2 === 0) {
                shelf1.appendChild(bookDiv);
            } else {
                shelf2.appendChild(bookDiv);
            }
        });
    }

    function deleteBook(index) {
        books.splice(index, 1);
        renderBooks();
    }

    newBookButton.addEventListener("click", function () {
        modal.style.display = "block";
    });

    deleteBookButton.addEventListener("click", function () {
        if (books.length > 0) {
            const index = books.length - 1;
            deleteBook(index);
        }
    });

    bookForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const title = document.getElementById("title").value;
        const author = document.getElementById("author").value;
        const imageInput = document.getElementById("image");
        const imageFile = imageInput.files[0];

        if (!imageFile) {
            alert("يرجى اختيار صورة.");
            return;
        }

        const imageReader = new FileReader();
        imageReader.onload = function () {
            const image = imageReader.result; // الصورة كبيانات URL
            const newBook = { title, author, image };
            books.push(newBook);
            renderBooks();
            modal.style.display = "none";
            bookForm.reset();
        };
        imageReader.readAsDataURL(imageFile);
    });

    shelf1.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-button")) {
            const index = Array.from(e.target.parentElement.parentElement.children).indexOf(e.target.parentElement);
            deleteBook(index);
        }
    });

    shelf2.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-button")) {
            const index = Array.from(e.target.parentElement.parentElement.children).indexOf(e.target.parentElement);
            deleteBook(index);
        }
    });

    renderBooks();
});
