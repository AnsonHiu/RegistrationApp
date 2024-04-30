export function CreateBattleCategory() {
    return (
        // <div className="flex flex-col mt-5">
        //     <div className="flex flex-row">
        //         <label>Category</label>
        //         <input type="text" />
        //     </div>
        //     <div className="flex flex-row mt-4">
        //         <label>Participants per team</label>
        //         <input type="text" />
        //     </div>
        // </div>
        <table className="mt-5">
            <tbody>     
                <tr>
                    <td><label>Category</label></td>
                    <td><input type="text" /></td>
                </tr>
                <tr>
                    <td><label>Participants per team</label></td>
                    <td><input type="text" /></td>
                </tr>
            </tbody>
        </table>
    );
}