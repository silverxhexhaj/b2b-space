import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Input } from './ui/input';
import { Button } from './ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table"

interface Business {
    id: string;
    name: string;
    location: string;
    industry: string;
    contact_info: string;
}

interface BusinessSearchProps {
    onAddBusiness: (business: Business) => void;
}

export default function BusinessSearch({ onAddBusiness }: BusinessSearchProps) {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<Business[]>([]);
    const [loading, setLoading] = useState(false);

    const searchBusinesses = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('businesses')
                .select('*')
                .ilike('name', `%${query}%`)
                .limit(10);

            if (error) throw error;
            setResults(data || []);
        } catch (error) {
            console.error('Error searching businesses:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search businesses..."
                    onKeyDown={(e) => e.key === 'Enter' && searchBusinesses()}
                />
                <Button onClick={searchBusinesses} disabled={loading}>
                    {loading ? 'Searching...' : 'Search'}
                </Button>
            </div>

            {results.length > 0 && (
                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Location</TableHead>
                                <TableHead>Industry</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {results.map((business) => (
                                <TableRow key={business.id}>
                                    <TableCell>{business.name}</TableCell>
                                    <TableCell>{business.location}</TableCell>
                                    <TableCell>{business.industry}</TableCell>
                                    <TableCell>
                                        <Button size="sm" onClick={() => onAddBusiness(business)}>
                                            Add
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            )}
        </div>
    );
}
