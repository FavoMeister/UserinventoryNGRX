import { Pipe, PipeTransform } from '@angular/core';
import { Customer } from '../models/customer.model';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(customers: Customer[] | null, searchTerm: string): Customer[] {
    // Si no hay clientes o no hay término de búsqueda, devolvemos la lista original intacta
    if (!customers) return [];
    if (!searchTerm || searchTerm.trim() === '') return customers;

    const lowerSearch = searchTerm.toLowerCase().trim();

    return customers.filter(customer => {
      const nameMatch = customer.name?.toLowerCase().includes(lowerSearch);
      const emailMatch = customer.email?.toLowerCase().includes(lowerSearch);
      
      // Retorna verdadero si coincide el nombre O el email
      return nameMatch || emailMatch;
    });
  }

}
