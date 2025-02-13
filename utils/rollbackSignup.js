// Helper function to retry rollback
export async function rollbackUser(supabase, userId) {
    let attempts = 3;
    while (attempts > 0) {
        const { error } = await supabase.auth.admin.deleteUser(userId);
        if (!error) return true;
        attempts--;
        await new Promise((res) => setTimeout(res, 1000)); // Wait before retrying
    }
    console.error("Rollback failed: Could not delete user after multiple attempts.");
    return false;
}