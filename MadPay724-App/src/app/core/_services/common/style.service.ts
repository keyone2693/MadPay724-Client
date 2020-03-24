import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StyleService {
  private host: Node;
  private stylesMap: Map<string, Node> = new Map();

  constructor() {
    this.host = document.head;
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
    this.host.appendChild(node);
  }

  removeStyle(key: string) {
    const node = this.stylesMap.get(key);
    if (node) {
      this.stylesMap.delete(key);
      this.host.removeChild(node);
    }
  }
}
