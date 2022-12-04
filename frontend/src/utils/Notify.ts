import { Notyf } from "notyf";
import 'notyf/notyf.min.css'; // for React, Vue and Svelte


class NotifyService {

    private notification = new Notyf({ duration: 3000, dismissible: true , position: { x: "left", y: "bottom" } });

    public success(message: string): void {
        this.notification.success(message);
    }

    public error(err: any): void {
        const message = this.getError(err);
        this.notification.error(message);
    }
    

    private getError(err: any): string {

        if (typeof err === "string") return err;

        if (typeof err.response?.data === "string") return err.response.data; // axios: 401, 403, 500

        if (Array.isArray(err.response?.data)) return err.response.data[0]; // axios: 400 - array of errors

        if (typeof err.message === "string") return err.message;

        return "Some error, please try again.";
    }

}

const notify = new NotifyService();

export default notify;