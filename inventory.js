const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV2dm55Z21za2tndGpvZ2hzdGt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njk2NzUwMzksImV4cCI6MTk4NTI1MTAzOX0.ZPy4arGJv5_vA8rzv9Y7KQHv69k7DE0tbzoaMI5GFeE";

const url = "https://evvnygmskkgtjoghstku.supabase.co";

const database = supabase.createClient(url, key);
const getAllInventories = async () => {
    let response = await database
        .from('Coach')
        .select('*')

    console.log(response);
}

