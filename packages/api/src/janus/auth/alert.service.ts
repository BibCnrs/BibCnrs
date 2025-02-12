import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { janus_account } from "@prisma/client";
import { Config } from "../../config";
import { JanusAccount } from "../accounts/accounts.type";

@Injectable()
export class JanusAlertService {
	private readonly bibadminHost: string;
	private readonly mailServer: { from: string; to: string };

	constructor(readonly configService: ConfigService<Config, true>) {
		this.bibadminHost =
			this.configService.get<Config["services"]>("services").bibadmin;
		this.mailServer = this.configService.get<Config["mailer"]>("mailer");
	}

	private getEditHref(id: string): string {
		return `${this.bibadminHost}/#/janusAccounts/${id}`;
	}

	private getListHref(uid: string): string {
		const [, root] = uid.match(/^(.*?)\.[0-9]+$/) || [null, uid];
		return `${this.bibadminHost}/#/janusAccounts?filter={"uid"%3A"${root}"}`;
	}

	private getLink({ uid, id }): string {
		return `<a href="${this.getEditHref(id)}" aria-label="getLink">${uid}</a>`;
	}

	getSimilarAlertMailHtml(account, similarAccounts): string {
		return `<p>Le nouveau compte ${this.getLink(account)} ressemble aux comptes suivants : </p>
    <a href="${this.getListHref(account.uid)}" aria-label="getAccount">Liste :</a>
    <ul>
        ${similarAccounts
					.map((account) => `<li>${this.getLink(account)}</li>`)
					.join("\n")}
    </ul>`;
	}

	getSimilarAlertMailText(account, similarAccounts): string {
		return `Le nouveau compte ${account.uid} : ${this.getEditHref(account.id)} ressemble aux comptes suivants :
    Liste ${this.getListHref(account.uid)} :
    ${similarAccounts
			.map(({ uid, id }) => `- ${uid} : ${this.getEditHref(id)}`)
			.join("\n")}`;
	}

	getSimilarUidAlertMail(
		account: JanusAccount,
		similarAccounts: janus_account[],
	) {
		return account
			? {
					from: this.mailServer.from,
					to: this.mailServer.to,
					subject: `Alerte : Nouveau uid ${account.uid} similaire`,
					text: this.getSimilarAlertMailText(account, similarAccounts),
					html: this.getSimilarAlertMailHtml(account, similarAccounts),
				}
			: null;
	}
}
