const  Header = require("../src/components/Header");
const { render, screen, fireEvent } = require("@testing-library/react");

describe("Header", () => {
    it("should open the dropdown", () => {
        render(<Header/>);
        const account = screen.getByTestId("account");
        fireEvent.click(account);
        expect(screen.getByText("View account")).toBeInTheDocument();
    });
});