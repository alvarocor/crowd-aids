function useQuery() {
    const url = new URL(window.location)

    return {
        getParam(name) {
            return url.searchParams.get(name)
        },

        setParam(name, value) {
            url.searchParams.set(name, value);

            window.history.pushState({}, "", url);
        }
    }
}

export default useQuery