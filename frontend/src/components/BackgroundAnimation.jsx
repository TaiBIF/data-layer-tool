import React from "react";

const BackgroundAnimation = () => {
    return (
        <div className="bg-ani-fixed">
            <div className="cirg1">
                <img
                    src={`${import.meta.env.BASE_URL}images/cir1.png`}
                    alt=""
                />
            </div>
            <div className="cirg2">
                <img
                    src={`${import.meta.env.BASE_URL}images/cir2.png`}
                    alt=""
                />
            </div>
            <div className="cirg3">
                <img
                    src={`${import.meta.env.BASE_URL}images/cir3.png`}
                    alt=""
                />
            </div>
            <div className="cirg4">
                <img
                    src={`${import.meta.env.BASE_URL}images/cir4.png`}
                    alt=""
                />
            </div>
        </div>
    );
};

export default BackgroundAnimation;
