
let products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        category: "Electronics",
        description: "High-quality wireless headphones with noise cancellation and 30-hour battery life."
    },
    {
        id: 2,
        name: "Summer Dress",
        price: 45.99,
        image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        category: "Clothing",
        description: "Lightweight and breathable summer dress perfect for any occasion."
    },
    {
        id: 3,
        name: "Smart Watch",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        category: "Electronics",
        description: "Feature-rich smartwatch with health monitoring and notifications."
    },
    {
        id: 4,
        name: "Kitchen Blender",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80",
        category: "Home",
        description: "Powerful blender with multiple speed settings and easy-to-clean design."
    }
];

let currentProductId = 5;


const productsContainer = document.getElementById('productsContainer');
const productModal = document.getElementById('productModal');
const productForm = document.getElementById('productForm');
const addProductBtn = document.getElementById('addProductBtn');
const cancelBtn = document.getElementById('cancelBtn');
const closeBtn = document.querySelector('.close');
const modalTitle = document.getElementById('modalTitle');
const productIdInput = document.getElementById('productId');
const productNameInput = document.getElementById('productName');
const productPriceInput = document.getElementById('productPrice');
const productImageInput = document.getElementById('productImage');
const productCategoryInput = document.getElementById('productCategory');
const productDescriptionInput = document.getElementById('productDescription');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');


document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    
   
    addProductBtn.addEventListener('click', openAddProductModal);
    cancelBtn.addEventListener('click', closeModal);
    closeBtn.addEventListener('click', closeModal);
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    productForm.addEventListener('submit', handleFormSubmit);
    
   
    window.addEventListener('click', function(event) {
        if (event.target === productModal) {
            closeModal();
        }
    });
    

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            mainNav.classList.remove('active');
        }
    });
});


function toggleMobileMenu() {
    mainNav.classList.toggle('active');
}


function renderProducts() {
    productsContainer.innerHTML = '';
    
    if (products.length === 0) {
        productsContainer.innerHTML = '<p class="no-products">No products available. Add your first product!</p>';
        return;
    }
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div class="product-actions">
                    <button class="btn-edit" data-id="${product.id}">Edit</button>
                    <button class="btn-delete" data-id="${product.id}">Delete</button>
                </div>
            </div>
        `;
        productsContainer.appendChild(productCard);
    });
    
    
    document.querySelectorAll('.btn-edit').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            openEditProductModal(productId);
        });
    });
    
    document.querySelectorAll('.btn-delete').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            deleteProduct(productId);
        });
    });
}


function openAddProductModal() {
    resetForm();
    modalTitle.textContent = 'Add New Product';
    productModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; 
}


function openEditProductModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    resetForm();
    modalTitle.textContent = 'Edit Product';
    
    
    productIdInput.value = product.id;
    productNameInput.value = product.name;
    productPriceInput.value = product.price;
    productImageInput.value = product.image;
    productCategoryInput.value = product.category;
    productDescriptionInput.value = product.description;
    
    productModal.style.display = 'block';
    document.body.style.overflow = 'hidden'; 
}


function closeModal() {
    productModal.style.display = 'none';
    resetForm();
    document.body.style.overflow = 'auto';
}


function resetForm() {
    productForm.reset();
    productIdInput.value = '';
    modalTitle.textContent = 'Add New Product';
}


function handleFormSubmit(event) {
    event.preventDefault();
    
    const id = productIdInput.value ? parseInt(productIdInput.value) : currentProductId++;
    const name = productNameInput.value;
    const price = parseFloat(productPriceInput.value);
    const image = productImageInput.value;
    const category = productCategoryInput.value;
    const description = productDescriptionInput.value;
    
    if (!name || !price || !image || !category) {
        alert('Please fill in all required fields.');
        return;
    }
    
    const product = {
        id,
        name,
        price,
        image,
        category,
        description
    };
    
    if (productIdInput.value) {
  
        const index = products.findIndex(p => p.id === id);
        if (index !== -1) {
            products[index] = product;
        }
    } else {
     
        products.push(product);
    }
    
    renderProducts();
    closeModal();
}


function deleteProduct(productId) {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter(product => product.id !== productId);
        renderProducts();
    }
}