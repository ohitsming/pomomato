'use client';

import { useEffect, useState } from "react";
import Scene from "scenejs";
import '../css/tree.css';
import { POMODORO_TIMER } from '@/lib/constant';

export default function Tree({currentTreeTime = 0}) {

    useEffect(() => {
        const sceneTree = new Scene(
            {
                ".background>.flower": function (i: any) {
                    return {
                        0: { opacity: 0, transform: "translateY(0px) rotate(0deg)" },
                        1: { opacity: 1 },
                        4: { opacity: 1 },
                        5: { opacity: 0, transform: "translateY(300px) rotate(360deg)" },
                        options: {
                            delay: 7 + i,
                            iterationCount: "infinite",
                        },
                    };
                },
            },
            {
                selector: true,
            }
        );

        const baseBranch: any = sceneTree.newItem(`.tree`);
        baseBranch.setElement(document.querySelector(".tree"));
        baseBranch.set(0, 'opacity', 0);
        baseBranch.set(2, 'opacity', 1);
        baseBranch.set(2, 'display', 'block');
        baseBranch.set(0, "transform", "scale", 0);
        baseBranch.set(POMODORO_TIMER * 60, "transform", "scale", 1);

        // const petals: any = sceneTree.newItem('petals');
        // petals.setElement(document.querySelector('.background>.flower'));
        // petals.set(POMODORO_TIMER - 5, 'opacity', 0)
        // petals.set(POMODORO_TIMER - 5, 'transform', 'translateY(0px) rotate(0deg)')
        // petals.set(POMODORO_TIMER - 4, 'opacity', 1)
        // petals.set(POMODORO_TIMER - 4, 'opacity', 1)
        // petals.set(POMODORO_TIMER, 'opacity', 0)
        // petals.set(POMODORO_TIMER, 'transform', 'translateY(300px) rotate(360deg)')
        // petals.setOptions({
        //     delay: 7,
        //     iterationCount: "infinite",
        // })

        const branchs = document.querySelectorAll(".tree .branch, .tree .leaf, .tree .flower1");
        const depths = [0, 0, 0];

        const userDefinedTime = POMODORO_TIMER; // Example: User-defined time in seconds
        const totalOriginalTime = 7; // Original total animation time in seconds
        const timeScale = (totalOriginalTime / userDefinedTime) * 1.3;

        branchs.forEach((branch, i) => {
            const className = branch.className;
            const sceneItem: any = sceneTree.newItem(`item${i}`);

            if (className.includes("branch-inner")) {
                ++depths[1];
                depths[2] = 0;
            } else if (className.includes("branch")) {
                ++depths[0];
                depths[1] = 0;
                depths[2] = 0;
            }
            else if (className.includes("leaf") || className.includes("flower1")) {
                ++depths[2];
            }

            sceneItem.setElement(branch);
            const branchTime = (1 + depths[0] * 0.5 + depths[1] * 0.5 + depths[2] * 0.5) * timeScale;

            sceneItem.set(branchTime, "transform", "scale", 0);
            sceneItem.set(branchTime + (1 * timeScale) , "transform", "scale", 1);
        });

        sceneTree.setTime(currentTreeTime);

        return (() => {
            sceneTree.clear()
        })


    }, [currentTreeTime]);
    

    return (
        <div className="background">
            { (currentTreeTime >= (POMODORO_TIMER * 60)) && (<>
                <div className="flower roundpetal petal5 flower1">
                    <div className="petal">
                        <div className="petal">
                            <div className="petal">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flower roundpetal petal5 flower2 blueflower">
                    <div className="petal">
                        <div className="petal">
                            <div className="petal">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flower roundpetal petal5 flower3 yellowflower">
                    <div className="petal">
                        <div className="petal">
                            <div className="petal">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flower roundpetal petal5 flower4 purpleflower">
                    <div className="petal">
                        <div className="petal">
                            <div className="petal">
                            </div>
                        </div>
                    </div>
                </div>
            </>)}
            
            <div className="slope"></div>

            { (currentTreeTime > 3) && (<>
                <div className="tree">
                    <div className="leaf leaf1"></div>
                    <div className="leaf leaf2"></div>


                    <div className="branch left branch1">
                        <div className="branch left branch-inner1">
                            <div className="leaf leaf1"></div>
                            <div className="leaf leaf2"></div>
                            <div className="leaf leaf3"></div>
                            <div className="heart flower1 blueflower">
                            </div>
                        </div>
                        <div className="branch left branch-inner2">
                            <div className="leaf leaf1"></div>
                            <div className="leaf leaf2"></div>
                            <div className="leaf leaf3"></div>
                            <div className="tulip flower1 redflower">
                                <div className="peak"></div>
                            </div>
                        </div>
                        <div className="branch left branch-inner3">
                            <div className="leaf leaf1"></div>
                            <div className="leaf leaf2"></div>
                        </div>
                        <div className="flower petal5 flower1 redflower">
                            <div className="petal">
                                <div className="petal">
                                    <div className="petal">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="branch right branch2">
                        <div className="branch left branch-inner1">
                            <div className="leaf leaf1"></div>
                            <div className="leaf leaf2"></div>
                            <div className="leaf leaf3"></div>
                            <div className="flower petal5 flower1 blueflower">
                                <div className="petal">
                                    <div className="petal">
                                        <div className="petal">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="branch right branch-inner2">
                            <div className="leaf leaf1"></div>
                            <div className="leaf leaf2"></div>
                            <div className="leaf leaf3"></div>
                            <div className="tulip flower1 greenflower">
                                <div className="peak"></div>
                            </div>
                        </div>
                        <div className="branch right branch-inner3">
                            <div className="leaf leaf1"></div>
                            <div className="leaf leaf2"></div>
                            <div className="leaf leaf3"></div>
                            <div className="branch left branch-inner4">
                                <div className="leaf leaf1"></div>
                                <div className="flower petal5 flower1 yellowflower">
                                    <div className="petal">
                                        <div className="petal">
                                            <div className="petal">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tulip flower1 purpleflower">
                                <div className="peak"></div>
                            </div>
                        </div>
                        <div className="flower petal5 roundpetal flower1">
                            <div className="petal">
                                <div className="petal">
                                    <div className="petal">
                                        <div className="petal">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="branch left branch3">
                        <div className="branch right branch-inner1">
                            <div className="leaf leaf1"></div>
                            <div className="leaf leaf2"></div>
                            <div className="leaf leaf3"></div>
                            <div className="heart flower1">
                            </div>
                        </div>
                        <div className="branch left branch-inner2">
                            <div className="leaf leaf1"></div>
                            <div className="leaf leaf2"></div>
                            <div className="leaf leaf3"></div>
                            <div className="tulip flower1">
                                <div className="peak"></div>
                            </div>
                        </div>
                        <div className="leaf leaf1"></div>
                        <div className="leaf leaf2"></div>
                        <div className="flower roundpetal petal5 flower1 purpleflower">
                            <div className="petal">
                                <div className="petal">
                                    <div className="petal">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="branch right branch4">
                        <div className="branch left branch-inner1">
                            <div className="leaf leaf1"></div>
                            <div className="leaf leaf2"></div>
                            <div className="leaf leaf3"></div>
                            <div className="flower petal5 flower1 yellowflower">
                                <div className="petal">
                                    <div className="petal">
                                        <div className="petal">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="branch right branch-inner2">
                            <div className="leaf leaf1"></div>
                            <div className="leaf leaf2"></div>
                            <div className="leaf leaf3"></div>
                            <div className="tulip tulip1 flower1 purpleflower">
                                <div className="peak"></div>
                            </div>
                        </div>
                        <div className="flower petal5 roundpetal flower1">
                            <div className="petal">
                                <div className="petal">
                                    <div className="petal">
                                        <div className="petal">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="branch left branch5">
                        <div className="branch right branch-inner1">
                            <div className="leaf leaf1"></div>
                            <div className="leaf leaf2"></div>
                            <div className="leaf leaf3"></div>
                            <div className="heart flower1">
                            </div>
                        </div>
                        <div className="branch left branch-inner2">
                            <div className="leaf leaf1"></div>
                            <div className="leaf leaf2"></div>
                            <div className="leaf leaf3"></div>
                            <div className="tulip flower1 greenflower">
                                <div className="peak"></div>
                            </div>
                        </div>
                        <div className="flower roundpetal petal5 flower1 blueflower">
                            <div className="petal">
                                <div className="petal">
                                    <div className="petal">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>)}

        </div>
    );
}