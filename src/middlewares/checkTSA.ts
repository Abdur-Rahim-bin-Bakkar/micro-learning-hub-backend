export const verifyTSA = async (req: Request,
    res: Response,
    next: NextFunction
) => {
    const userInfo = req?.userInfo;
    const role = userInfo?.role;
    console.log(role, 'ei role e to khoji')
    const allowedRoles = ["student", "teacher", "admin"];

    if (allowedRoles.includes(role)) {
        return next();
    }

    return res.status(403).send({ message: "Forbidden Access" })

}