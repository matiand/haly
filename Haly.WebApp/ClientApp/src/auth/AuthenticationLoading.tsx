import { styled } from "../common/theme";
import { useDelayedRender } from "../common/useDelayedRender";
import Button from "../ui/Button";
import LoadingIndicator from "../ui/LoadingIndicator";

type AuthenticationLoadingProps = {
    logout: () => void;
};

function AuthenticationLoading({ logout }: AuthenticationLoadingProps) {
    const isReady = useDelayedRender(2000);

    return (
        <div>
            <ButtonWrapper>
                {/* Wait for 2 seconds before showing this button to avoid flashing it when we */}
                {/* wait for token renewal. */}
                {isReady && (
                    <Button variant="round" type="button" onClick={logout}>
                        Log out
                    </Button>
                )}
            </ButtonWrapper>

            <LoadingIndicator />
        </div>
    );
}

const ButtonWrapper = styled("div", {
    position: "absolute",
    top: "$700",
    right: "$900",
});

export default AuthenticationLoading;
