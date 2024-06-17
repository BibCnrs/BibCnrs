import polyglotI18nProvider from "ra-i18n-polyglot";
import React from "react";
import { Admin, Resource } from "react-admin";
import adminUsers from "./adminUsers";
import authProvider from "./authProvider";
import communities from "./communities";
import contentManagement from "./contentManagement";
import Dashboard from "./dashboard/dashboard";
import dataProvider from "./dataProvider";
import databases from "./databases";
import favoris from "./favoris";
import langFr from "./i18n/fr";
import inist from "./inist";
import institutes from "./institutes";
import janus from "./janus";
import licenses from "./licenses";
import medias from "./medias";
import resources from "./resources";
import sections from "./sections";
import testsNews from "./testsNews";
import units from "./units";

const i18nProvider = polyglotI18nProvider(() => langFr, "fr", {
	allowMissing: true,
});

const App = () => (
	<Admin
		title="BibAdmin"
		dashboard={Dashboard}
		i18nProvider={i18nProvider}
		dataProvider={dataProvider}
		authProvider={authProvider}
		requireAuth
	>
		<Resource name="adminUsers" {...adminUsers} />
		<Resource name="inistAccounts" {...inist} />
		<Resource name="janusAccounts" {...janus} />
		<Resource name="institutes" {...institutes} />
		<Resource name="units" {...units} />
		<Resource name="communities" {...communities} />
		<Resource name="databases" {...databases} />
		<Resource name="section_cn" {...sections} />
		<Resource name="revues" {...favoris} />
		<Resource name="licenses" {...licenses} />
		<Resource name="contentManagement" {...contentManagement} />
		<Resource name="news" {...testsNews} />
		<Resource name="resources" {...resources} />
		<Resource name="medias" {...medias} />
	</Admin>
);

export default App;
