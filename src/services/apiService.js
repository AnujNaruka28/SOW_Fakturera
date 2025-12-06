class ApiService {
    constructor(baseUrl){
        this.baseUrl = baseUrl,
        this.defaultHeaders = {
            "Content-Type": "application/json",
        };
    }

    setToken(token) {
        this.defaultHeaders.authorization = token ? `Bearer ${token}` : undefined;
    }

    async req(endpoint, method = "GET", body = null) {
        const options = {
            method,
            headers: this.defaultHeaders
        };

        if(body) {
            options.body = JSON.stringify(body);
        }

        const res = await fetch(`${this.baseUrl}${endpoint}`,options);

        if(!res.ok) {
            const errMsg = await res.text();
            throw new Error(errMsg)
        }

        return res.status !== 204 ? res.json() : null;
    }

    get(endpoint) {
        return this.req(endpoint);
    }
    post(endpoint, body) {
        return this.req(endpoint,"POST", body);
    }
    patch(endpoint, body) {
        return this.req(endpoint,"PATCH", body);
    }
    put(endpoint, body) {
        return this.req(endpoint,"PUT", body);
    }
    delete(endpoint) {
        return this.req(endpoint,"DELETE");
    }

    login(email,password){
        return this.post('/auth/login', {email, password});
    }

    logout() {
        this.setToken(null);
        localStorage.removeItem("access_token");
    }

    getProducts() {
        return this.get('/products');
    }

    updateProduct(productId,body) {
        console.log(productId, body)
        return this.patch(`/products/update-product/${productId}`,body);
    }
}

const apiService = new ApiService(import.meta.env.VITE_BASE_API_URL);
apiService.setToken(localStorage.getItem("access_token"));

export default apiService;