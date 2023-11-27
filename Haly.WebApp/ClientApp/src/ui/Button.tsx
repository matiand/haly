import { styled } from "../common/theme";

type ButtonProps = {
    label: string;
    onClick: () => void;
};

function Button({ label, onClick }: ButtonProps) {
    return (
        <StyledButton type="button" onClick={onClick}>
            {label}
        </StyledButton>
    );
}

const StyledButton = styled("button", {
    background: "$white800",
    borderRadius: "999px",
    color: "$black800",
    cursor: "pointer",
    fontWeight: 700,
    padding: "$400 $800",

    "&:hover": {
        transform: "scale(1.05)",
    },
});

export default Button;
