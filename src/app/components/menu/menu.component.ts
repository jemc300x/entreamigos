import { Component, OnInit, Renderer2 } from '@angular/core';
import { Category } from 'src/app/model/category';
import { MenuItem } from 'src/app/model/menu-item';
import MENU_ITEMS from '../../../assets/menu.json';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  categories: Category[] = [
    { name: 'Desayunos', image: '', code: 'desayuno' },
    { name: 'Snack', image: '', code: 'snack' },
    { name: 'Smoothies', image: '', code: 'smoothie' },
    { name: 'Milkshake', image: '', code: 'milkshake' },
    { name: 'Bebidas', image: '', code: 'bebida' },
  ];

  currentCategory: any;

  items: MenuItem[] = [];
  currentItems: any[] = [];
  currentItem!: MenuItem;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.items = MENU_ITEMS;
    this.currentItems = [...this.items];
  }

  onSelectItem(item: MenuItem) {
    this.currentItem = item;
  }

  onSelectCategory(category: Category) {
    this.currentCategory = category;
    this.currentItems = this.items.filter(
      (item) => item.category === category.code
    );
  }

  onMakeAnOrder(item: MenuItem) {
    const message = encodeURI(
      'Hola me gustaria mas información sobre el ' + item.name
    );
    const newElement = this.renderer.createElement('a');
    newElement.href = `https://api.whatsapp.com/send/?phone=51${item.phoneNumber}&text=${message}`;
    newElement.target = '_blank';
    this.renderer.appendChild(document.body, newElement);
    this.renderer.selectRootElement(newElement).click();
  }
}
