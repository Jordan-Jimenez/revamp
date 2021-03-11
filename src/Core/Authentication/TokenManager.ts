import Cookies from "js-cookie";

import jwt from "jsonwebtoken";

import { observable, action, computed } from "mobx";
import { createContext } from "react";

export class TokenManager {
  @observable
  public token?: string;

  @action
  public setToken(token?: string) {
    this.token = token;
  }

  private tokenKey = "starfarm:token";

  private tokenDomain = {
    path: "",
    domain:
      process.env.NODE_ENV === "development"
        ? undefined
        : process.env.REACT_APP_COOKIES_DOMAIN,
  };

  @computed
  public get isExpired() {
    if (!this.decodedToken) {
      return true;
    }

    return Date.now() >= this.decodedToken.exp * 1000;
  }

  @computed
  public get decodedToken() {
    const token = this.token;

    if (!token) {
      return undefined;
    }

    const decoded = jwt.decode(token) as any;

    return decoded as Token;
  }

  public clearToken() {
    try {
      Cookies.remove(this.tokenKey, this.tokenDomain);

      this.token = undefined;

      return true;
    } catch (error) {
      console.error(error);

      return false;
    }
  }

  public storeToken(sessionToken: string) {
    try {
      this.token = sessionToken;
      Cookies.set(this.tokenKey, sessionToken, this.tokenDomain);

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  public getToken() {
    try {
      return Cookies.get(this.tokenKey);
    } catch (error) {
      return error;
    }
  }
}

export const TokenManagerStore = new TokenManager();

const TokenManagerContext = createContext(TokenManagerStore);

export default TokenManagerContext;
