import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StyleScriptService {
  private styleshost: Node;
  private scriptshost: Node;
  private stylesMap: Map<string, Node> = new Map();
  private scriptsMap: Map<string, Node> = new Map();

  constructor() {
    this.styleshost = document.head;
    this.scriptshost = document.body;
   }


  private createStyleNode(url: string): Node {
    const node = document.createElement('link');
    node.type = 'text/css';
    node.rel = 'stylesheet';
    node.charset = 'utf-8';
    node.href = url;
    return node;
  }
  addStyle(key: string, url: string) {
    const node = this.createStyleNode(url);
    this.stylesMap.set(key, node);
    this.styleshost.appendChild(node);
  }
  removeStyle(key: string) {
    const node = this.stylesMap.get(key);
    if (node) {
      this.stylesMap.delete(key);
      this.styleshost.removeChild(node);
    }
  }


  private createScriptNode(url: string): Node {
    const node = document.createElement('script');
    node.type = 'text/javascript';
    node.charset = 'utf-8';
    node.src = url;
    return node;
  }

  addScript(key: string, url: string) {
    const node = this.createScriptNode(url);
    this.scriptsMap.set(key, node);
    this.scriptshost.appendChild(node);
  }

  removeScript(key: string) {
    const node = this.scriptsMap.get(key);
    if (node) {
      this.scriptsMap.delete(key);
      this.scriptshost.removeChild(node);
    }
  }
}
