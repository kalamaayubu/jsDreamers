import cookies from "next/headers";
import Menu from "../general/Menu";

const MenuWrapper = async () => {
    try {
        const cookieStore = cookies();
        console.log("Available cookies:", cookieStore.getAll()); // Log all cookies

        const authState = cookieStore.get('authState');

        if (!authState || !authState.value) {
            console.log("No authState cookie found or it's empty.");
            return <Menu user={null} />; // Return the Menu component without user data
        }

        console.log('authState:', authState); // Log the raw cookie value

        // Safely parse the cookie if it's valid JSON
        let parsedAuth;
        try {
            parsedAuth = JSON.parse(authState.value);
            console.log('Parsed authState:', parsedAuth);
        } catch (parseError) {
            console.error("Error parsing authState:", parseError);
            return <Menu user={null} />; // Return Menu with no user data if parsing fails
        }

        const user = parsedAuth ? parsedAuth.user : null;
        console.log('User from parsed authState:', user);

        return <Menu user={user} />;
    } catch (error) {
        console.error("Error fetching authState or user data:", error);
        return <Menu user={null} />; // Return Menu with no user data in case of an error
    }
};

export default MenuWrapper;
